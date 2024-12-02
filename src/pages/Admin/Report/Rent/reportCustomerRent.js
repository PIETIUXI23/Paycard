
var table;
$(function () {

    //#region load table
    var loadTable = function (areaId, roomId, statusRent, dateTimeFrom, dateTimeTo) {
        table = $('#table').DataTable({
            "processing": false,
            "serverSide": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "responsive": false,
            "searching": true,
            "autoWidth": false,
            "language": {
                "url": languageDatatable
            },
            "ajax": {
                "url": "fakedata.json", // Đường dẫn tới file JSON
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                { "data": "CustomerName", "name": "AreaName" },
                { "data": "IDCARDNO", "name": "IDCARDNO" },
                { "data": "Address", "name": "Address" },
                { "data": "Telephone1", "name": "Telephone1" },
                { "data": "AreaName", "name": "AreaName" },
                { "data": "RoomName", "name": "RoomName" },
                { "data": "FromDate", "name": "FromDate", "render": function (data) { return (data == "" ? data : moment(data).format("DD/MM/YYYY")); } },
                { "data": "ToDate", "name": "ToDate", "render": function (data) { return (data == "" ? data : moment(data).format("DD/MM/YYYY")); } },
                { "data": "ExpireDate", "name": "ExpireDate", "render": function (data) { return (data == "" ? data : moment(data).format("DD/MM/YYYY")); } },
                { "data": "StatusName", "name": "StatusName" },
                { "data": "RoomAmount", "name": "RoomAmount", "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 0, '') },
                { "data": "DepositAmount", "name": "DepositAmount", "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 0, '') },
                { "data": "TotalAmount", "name": "TotalAmount", "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 0, '') },
                { "data": "PayAmount", "name": "PayAmount", "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 0, '') },
                { "data": "RemainAmount", "name": "RemainAmount", "class": "dt-body-right", "render": $.fn.dataTable.render.number(',', '.', 0, '') },
                { "data": "PersonIntroduce", "name": "PersonIntroduce" },
                { "data": "Birthday", "name": "Birthday", "render": function (data) { return (data == "" ? data : moment(data).format("DD/MM/YYYY")); } },
            ],
            columnDefs: [
                {
                    render: function (data, type, full, meta) {
                        return "<div class='text-wrap width-200'>" + data + "</div>";
                    },
                    targets: 1
                }
            ],
            "drawCallback": function () {
                var api = this.api();
                if (api.rows().data().length > 0) {
                    var sumRoomAmount = api.column(8).data().sum();
                    var sumDepositAmount = api.column(9).data().sum();
                    var sumTotalAmount = api.column(10).data().sum();
                    var sumPayAmount = api.column(11).data().sum();
                    var sumRemainAmount = api.column(12).data().sum();
                    $("<tr><td colspan='8' class='dt-body-center'><strong>Cộng</strong></td><td class='dt-body-right'><strong>" + $.number(sumRoomAmount) + "</strong></td><td class='dt-body-right'><strong>"
                        + $.number(sumDepositAmount) + "</strong></td><td class='dt-body-right'><strong>" + $.number(sumTotalAmount) + "</strong></td><td class='dt-body-right'><strong>"
                        + $.number(sumPayAmount) + "</strong></td><td class='dt-body-right'><strong>" + $.number(sumRemainAmount)
                        + "</strong></td><td></td><td></td></tr>").insertAfter($(this[0]).find("tr:last"));
                }
            }
        });
        table.CreateButtonExportExcel({
            className: 'btn btn-primary',
            text: '<i class="fa fa-file-excel-o"></i>  Xuất file excel',
            extend: 'excelHtml5',
            isAutoWidth: false,
            isSTT: true,
            opitionStt: 0,
            sheetName: "DS Khách thuê phòng",
            filename: "DanhSachKhachThuePhong",
            ArrayColWidth: [5, 25, 35, 15, 20, 13, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13],
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                format: {
                    body: function (data, row, column) {
                        var dt = data;
                        if (column == 2) {
                            if (dt !== null && dt != "") {
                                return "\0" + dt;
                            } else {
                                return dt;
                            }
                        }
                        else if (column == 1) {
                            dt = dt.replace("<div class='text-wrap width-200'>", '');
                            dt = dt.replace("</div>", '');
                            return dt;
                        }
                        else if (column == 4) {
                            return "\0" + dt;
                        }
                        else {
                            return data;
                        }
                    }
                },
                modifier: {
                    page: 'current'
                },
                orthogonal: "export",
                trim: false
            },
            title: null,
            methodCustomeBeforeHeader: function (data, functions, rels, rowPos) {
                rowPos = functions.AddRow(["Danh sách khách thuê phòng"], rowPos);
                functions.MergeCells(rowPos, 13, 58);
                rowPos = functions.AddRow(["Từ " + $("#dateTimeFrom").val() + " đến " + $("#dateTimeTo").val()], rowPos);
                functions.MergeCells(rowPos, 13, 58);
                var nameArea = $("#areaID").val() == "" || $("#areaID").val() == "0" ? "Tất cả" : $("#areaID").closest("div").find(".select2-chosen").text();
                var nameRoom = $("#roomID").val() == "" || $("#roomID").val() == "0" ? "Tất cả" : $("#roomID").closest("div").find(".select2-chosen").text();
                var statusRent = $("#statusRent option[selected]").text();
                rowPos = functions.AddRow(["Nhà: " + nameArea + ", Phòng: " + nameRoom + ", Trạng thái: " + statusRent], rowPos);
                functions.MergeCells(rowPos, 13, 58);
            },
            methodCustomeAfterFooter: function (data, functions, rels, rowPos) {
                if (table.rows().data().length > 0) {
                    var sumRoomAmount = table.column(8).data().sum();
                    var sumDepositAmount = table.column(9).data().sum();
                    var sumTotalAmount = table.column(10).data().sum();
                    var sumPayAmount = table.column(11).data().sum();
                    var sumRemainAmount = table.column(12).data().sum();
                    var row = ['Cộng', '', '', '', '', '', '', '', '', $.number(sumRoomAmount), $.number(sumDepositAmount), $.number(sumTotalAmount), $.number(sumPayAmount), $.number(sumRemainAmount), '', ''];
                    rowPos = functions.AddRow(row, rowPos);
                    $('row:last', rels).attr('s', 73);
                    functions.MergeCells(rowPos, 8, 73);
                }
            },
        }, '#exportExcel');
    }
    //#endregion

    //#region instal control page
    $('#dateTimeFrom, #dateTimeTo').daterangepicker({
        "singleDatePicker": true,
        "singleClasses": "picker_3",
        "locale": {
            "format": "MM/YYYY",
            "applyLabel": "Đồng ý",
            "cancelLabel": "Hủy",
            "firstDay": 1
        }
    });
    $("#statusRent").select2();
    initiControlSelect2("#areaID", '/Global/LoadComboboxAreaForControlSelect2', 20, 'Tất cả', null, methodCallBackFormatResultControlSelect2, methodCallBackFormatSelectionControlSelect2, methodCallBackInitSelectionControlSelect2);
    initiControlSelect2NoPagging("#roomID", '/Global/LoadComboboxRoomForControlSelect2BasVariable', 20, 'Phòng', null, methodCallBackFormatResultControlSelect2, methodCallBackFormatSelectionControlSelect2, methodCallBackInitSelectionControlSelect2, function (term, page) {
        var areaId = $("#areaID").val();
        areaId = (areaId == "" || areaId == "") ? -1 : areaId;
        return {
            PayType: -1,
            StatusRoom: -1,
            StatusPayment: -1,
            SearchTerm: term,
            AreaId: areaId
        };
    });
    //#endregion

    //#region event button
    $("#areaID").change(function () {
        $("#roomID").val("").trigger("change");
    })
    $("#watchButton").click(function () {
        if ($.fn.DataTable.isDataTable('#table'))
            table.destroy();
        loadTable($("#areaID").val() == "" ? -1 : $("#areaID").val(), $("#roomID").val() == "" ? -1 : $("#roomID").val(), $("#statusRent").val(), moment($("#dateTimeFrom").val(), "MM/YYYY").format('YYYY/MM/01'), moment($("#dateTimeTo").val(), "MM/YYYY").format('YYYY/MM/') + moment($("#dateTimeTo").val(), "MM/YYYY").daysInMonth());
    })
    //#endregion

})