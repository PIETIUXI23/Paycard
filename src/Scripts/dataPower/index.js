import $ from 'jquery';
import moment from 'moment';
import toastr from 'toastr';

const initiControlSelect2 = () => { /* Your function implementation */ };
const methodCallBackFormatResultControlSelect2 = () => { /* Your function implementation */ };
const methodCallBackFormatSelectionControlSelect2 = () => { /* Your function implementation */ };
const methodCallBackInitSelectionControlSelect2 = () => { /* Your function implementation */ };
const languageDatatable = { /* Your language settings */ };
const $TR = $('#someElement'); // Assuming you have an element with id 'someElement'

var table;
var CreateTableNotAjax;
$(function () {
    $("#table th:eq(0)").hide();
    $("#table th:eq(1)").hide();
    $("#table th:eq(2)").hide();
    $("#table th:eq(8)").hide();
    $("#table th:eq(9)").hide();

    $.RolePermision($(""), $("#saveButton"), $(""));

    //#region install control
    $('#monthYear').daterangepicker({
        "singleDatePicker": true,
        "singleClasses": "picker_3",
        "locale": {
            "format": "MM/YYYY",
            "applyLabel": "Đồng ý",
            "cancelLabel": "Hủy",
            "firstDay": 1
        }
    });
    $("#payType").select2({ allowClear: true });
    $("#statusRoom").select2({ allowClear: true });
    initiControlSelect2("#areaID", '/Global/LoadComboboxAreaForControlSelect2', 20, 'Tất cả', null, methodCallBackFormatResultControlSelect2, methodCallBackFormatSelectionControlSelect2, methodCallBackInitSelectionControlSelect2);
    //#endregion

    //#region function load data
    var loadTable = function () {
        var areaId = $("#areaID").val();
        areaId = (areaId == "" || areaId == "") ? -1 : areaId;
        table = $('#table').DataTable({
            "processing": true,
            "serverSide": true,
            "orderMulti": false,
            "iDisplayLength": 20,
            "lengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
            "info": false,
            "language": {
                "url": languageDatatable
            },
            "ajax": {
                "url": "/DataPower/GetDataTableIndex",
                "type": "POST",
                "datatype": "json",
                "data": {
                    "AreaID": areaId,
                    "StatusRoom": $("#statusRoom").val(),
                    "PayType": $("#payType").val(),
                    "Month": moment($("#monthYear").val(), "MM/YYYY").format('M'),
                    "Year": moment($("#monthYear").val(), "MM/YYYY").format('YYYY'),
                }
            },
            "columns": [
                { "data": "RoomID", "name": "RoomID" },
                { "data": "RoomRentID", "name": "RoomRentID" },
                { "data": "PayType", "name": "PayType" },
                { "data": "AreaName", "name": "AreaName" },
                { "data": "RoomName", "name": "RoomName" },
                { "data": "CustomerName", "name": "CustomerName" },
                { "data": "OldValue", "name": "OldValue" },
                { "data": "NewValue", "name": "NewValue" },
                { "data": "UseValue", "name": "UseValue" },
                { "data": "OldValue1", "name": "OldValue1" },
                { "data": "NewValue1", "name": "NewValue1" },
                {
                    "targets": -1, "data": null, "render": function () {
                        return "<button type='button' class ='btn btn-info btn-xs' name='saveRow' title='Lưu'><i class ='fa fa-save'></i>  Lưu</button>";
                    }
                }
            ],
            "drawCallback": function () {
                CreateTableNotAjax = function (table) {
                    table.destroy();
                    table = $('#table').DataTable({
                        "processing": false,
                        "serverSide": false,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "responsive": true,
                        "searching": false,
                        "autoWidth": false,
                        "language": {
                            "url": languageDatatable
                        },
                        "columnDefs": [
                            { "visible": false, targets: 0 },
                            { "visible": false, targets: 1 },
                            { "visible": false, targets: 2 },
                            { "width": "15%", targets: 3 },
                            { "width": "15%", targets: 4 },
                            { "width": "25%", targets: 5 },
                            { "width": "15%", targets: 6, "render": function (data) { return "<input type='text' class='form-control' style='width:100%' name='oldValue' value='" + data + "'/>"; } },
                            { "width": "15%", targets: 7, "render": function (data) { return "<input type='text' class='form-control' style='width:100%' name='newValue' value='" + data + "'/>"; } },
                            { "width": "15%", targets: 8, "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 1, '') },
                            { "visible": false, targets: 9 },
                            { "visible": false, targets: 10 },
                        ],
                        "drawCallback": function (settings) {
                            $("input[name='oldValue'], input[name='newValue']").inputmask("numeric", { radixPoint: ".", groupSeparator: ",", digits: 4, autoGroup: true, rightAlign: true });
                            $.RolePermision($(""), $("#saveButton"), $(""));
                        },
                    });

                    table.CreateButtonExportExcel({
                        className: 'btn btn-primary',
                        text: '<i class="fa fa-file-excel-o"></i>  Xuất file excel',
                        extend: 'excelHtml5',
                        isAutoWidth: false,
                        isSTT: true,
                        opitionStt: 0,
                        sheetName: "DS PHONG",
                        filename: "BANG GHI CHI SO DIEN",
                        ArrayColWidth: [5, 10, 10, 20, 12, 12, 12],
                        exportOptions: {
                            columns: [3, 4, 5, 9, 10, 8],
                            modifier: {
                                page: 'current'
                            },
                            orthogonal: "export",
                            trim: false
                        },
                        title: null,
                        methodCustomeBeforeHeader: function (data, functions, rels, rowPos) {
                            rowPos = functions.AddRow(["BẢNG GHI CHỈ SỐ ĐIỆN"], rowPos);
                            functions.MergeCells(rowPos, 6, 58);
                            var nameArea = $("#areaID").val() == "" || $("#areaID").val() == "0" ? "Tất cả" : $("#areaID").closest("div").find(".select2-chosen").text();
                            var nameRoom = $("#statusRoom").val() == "" || $("#statusRoom").val() == "-1" ? "Tất cả" : $("#statusRoom").closest("div").find(".select2-chosen").text();
                            rowPos = functions.AddRow(["Nhà: " + nameArea + ", Phòng: " + nameRoom], rowPos);
                            functions.MergeCells(rowPos, 6, 58);
                        },
                    }, '#exportExcel');

                    return table;
                }
                setTimeout("table = CreateTableNotAjax(table);", 500);
            }
        });
    }
    //#endregion
    loadTable();
    //#region event button
    $(document).on("change", "input[name='oldValue']", function () {
        var value = $(this).val().replace(/,/gi, '');
        if (value == "") {
            value = 0;
            $(this).val(value);
        }
        $TR = $(this).closest('tr');
        var data = table.row($TR).data();
        var useValue = (parseFloat(data[7]).toFixed(1) - parseFloat(value).toFixed(1)).toFixed(1);
        $("#table").dataTable().fnUpdate(value, $TR, 6, true);
        $("#table").dataTable().fnUpdate(useValue, $TR, 8, true);
    });
    $(document).on("change", "input[name='newValue']", function () {
        var value = $(this).val().replace(/,/gi, '');
        if (value == "") {
            value = 0;
            $(this).val(value);
        }
        $TR = $(this).closest('tr');
        var data = table.row($TR).data();
        var useValue = (parseFloat(value).toFixed(1) - parseFloat(data[6]).toFixed(1)).toFixed(1);
        $("#table").dataTable().fnUpdate(value, $TR, 7, true);
        $("#table").dataTable().fnUpdate(useValue, $TR, 8, true);
    })

    $("#watchButton").click(function () {
        if ($.fn.DataTable.isDataTable('#table')) {
            table.destroy();
            $("#table th:eq(0)").hide();
            $("#table th:eq(1)").hide();
            $("#table th:eq(2)").hide();
            $("#table th:eq(9)").hide();
            $("#table th:eq(10)").hide();
        }
        else {
            $("#table th:eq(0)").show();
            $("#table th:eq(1)").show();
            $("#table th:eq(2)").show();
            $("#table th:eq(9)").show();
            $("#table th:eq(10)").show();
        }
        loadTable();
    })
    $("#saveButton").click(function () {
        var error = false;
        if ($('#CheckError').is(':checked')) {
            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var dataItem = this.data();
                var old = dataItem[6];
                var newValue = dataItem[7];
                if (parseInt(newValue) - parseInt(old) < 0) {
                    toastr["error"]("Chỉ số mới phải lớn hơn chỉ số cũ tại phòng " + dataItem[4], "Thông báo");
                    error = true;
                    return false;
                }
            })
        }
        if (error == true) {
            return;
        }
        $("#waiting").modal("show");
        var dataPorwers = [];
        var month = moment($("#monthYear").val(), "MM/YYYY").format('M');
        var year = moment($("#monthYear").val(), "MM/YYYY").format('YYYY');
        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var dataItem = this.data();
            dataPorwers.push({
                "PowerDataID": 0,
                "CustomerID": 0,
                "PayType": dataItem[2],
                "RoomID": dataItem[0],
                "RoomRentID": dataItem[1],
                "DataMonth": month,
                "DataYear": year,
                "OldValue": (dataItem[6]),
                "NewValue": (dataItem[7]),
                "UseValue": (dataItem[8]),
            });
        })
        if (dataPorwers.length > 0) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Bạn có đồng ý lưu chỉ số điện của tháng " + $("#monthYear").val() + " cho toàn bộ các phòng của nhà đang chọn không ?")) {
                $.ajax({
                    url: '/DataPower/AddOrUpdate',
                    type: 'post',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        DataPorwers: dataPorwers
                    }),
                    async: false,
                    cache: false,
                    success: function (data) {
                        if (!JSON.parse(data.Result)) {
                            toastr["error"]("Lưu dữ liệu thất bại. Vui lòng liên hệ với nhà phát triển để sớm khắc phục sự cố.", "Thông báo");
                            console.log("Lỗi lưu dữ liệu lưu thất bại: " + data.ErrorMessage);
                        }
                        else {
                            toastr["success"]("Lưu dữ liệu thành công", "Thông báo");
                        }
                        $("#waiting").modal("hide");
                    }
                })
            } else {
                $("#waiting").modal("hide");
            }
        } else {
            $("#waiting").modal("hide");
            toastr["success"]("Không có dữ liệu để lưu.", "Thông báo");
        }
    })

    $(document).on("click", "button[name='saveRow']", function () {
        var dataItem = table.row($(this).closest("tr")).data();
        var month = moment($("#monthYear").val(), "MM/YYYY").format('M');
        var year = moment($("#monthYear").val(), "MM/YYYY").format('YYYY');

        if (dataItem[7] == "" || dataItem[6] == "") {
            toastr["error"]("Vui lòng nhập chỉ số điện", "Thông báo");
            return;
        }

        if ($('#CheckError').is(':checked')) {
            if (parseInt(dataItem[7]) - parseInt(dataItem[6]) < 0) {
                toastr["error"]("Chỉ số mới phải lớn hơn chỉ số cũ", "Thông báo");
                return;
            }
        }
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có đồng ý lưu chỉ số điện phòng " + dataItem[4] + " trong tháng " + $("#monthYear").val() + " không ?")) {
            $.ajax({
                url: '/DataPower/AddOrUpdateFollowRoom',
                type: 'post',
                datatype: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    entity: {
                        "PowerDataID": 0,
                        "CustomerID": 0,
                        "PayType": dataItem[2],
                        "RoomID": dataItem[0],
                        "RoomRentID": dataItem[1],
                        "DataMonth": month,
                        "DataYear": year,
                        "OldValue": (dataItem[6]),
                        "NewValue": (dataItem[7]),
                        "UseValue": (dataItem[8]),
                    }
                }),
                async: false,
                cache: false,
                success: function (data) {
                    if (!JSON.parse(data.Result)) {
                        toastr["error"]("Lưu dữ liệu thất bại. Vui lòng liên hệ với nhà phát triển để sớm khắc phục sự cố.", "Thông báo");
                        console.log("Lỗi lưu dữ liệu lưu thất bại: " + data.ErrorMessage);
                    }
                    else {
                        toastr["success"]("Lưu dữ liệu thành công", "Thông báo");
                    }
                    $("#waiting").modal("hide");
                }
            })
        }
    })

    //#endregion
})