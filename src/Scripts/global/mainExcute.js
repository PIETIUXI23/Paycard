$(function () {
    //#region event button
    $("#logoutAccount, #logoutAccountMobile").click(function () {
        localStorage.setItem("Logout", true);
        $.ajax({
            url: '/Global/Logout',
            type: 'post',
            datatype: 'json',
            contentType: 'application/json',
            async: true,
            success: function (data) {
                if (!JSON.parse(data.Result)) {
                    toastr["error"]("Đăng xuất thất bại. Vui lòng liên hệ với nhà phát triển để sớm khắc phục sự cố.", "Thông báo");
                    console.log("Lỗi đăng xuất lưu thất bại: " + data.ErrorMessage);
                }
                else {
                    location.href = '/Login/Index';
                }
            }
        })
    })
    //#endregion
})