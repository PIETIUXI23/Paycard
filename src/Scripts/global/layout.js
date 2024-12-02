$(document).ready(function () {

    function calculator() {
        var sum = "";
        var len;
        var operators = ["+", "-", "*", "/"];
        var inputVal = document.getElementById("screen");
        $(".buttons .digit").on('click', function () {
            var num = $(this).attr('value');
            sum += num;
            $("#screen").html(sum);
            len = inputVal.innerHTML.split("");
            console.log(len);

        });
        $(".buttons .operator").on('click', function (e) {
            e.preventDefault();
            var ops = $(this).attr('value');
            sum += ops;
            $("#screen").html(sum);
            len = inputVal.innerHTML;
            if (/(?=(\D{2}))/g.test(sum)) {
                sum = len.substring(0, len.length - 1);
                $("#screen").html(sum);
            }
        });

        $("#equal").on('click', function () {
            var total = eval(sum);
            $("#screen").html(total % 1 != 0 ? total.toFixed(2) : total);
        });

        $("#clear").on('click', function () {
            sum = "";
            arr = [];
            $("#screen").html(0);
        });

    };
    calculator();

    $("#saveModal").click(function () {
        $.ajax({
            url: "/Global/AddOrUpdateNote",
            type: 'post',
            datatype: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                entity: {
                    Note: $("#Note").val(),
                },
            }),
            async: true,
            cache: false,
            success: function (data) {
                if (!JSON.parse(data.Result)) {
                    toastr["error"]("Dữ liệu lưu thất bại. Vui lòng liên hệ với nhà phát triển để sớm khắc phục sự cố.");
                    console.log("Lỗi dữ liệu lưu thất bại: " + data.ErrorMessage);
                }
                else {
                    $('#NoteModal').modal('hide');
                }
            }
        })
    })

    $.ajax({
        url: '/Global/GetDataNote',
        cache: false,
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        async: false,
        cache: false,
        success: function (reponsive) {
            $("#Note").val(reponsive.data.Note)
        }
    });
});