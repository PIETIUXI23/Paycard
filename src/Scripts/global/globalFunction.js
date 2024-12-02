//#region cài đặt control web

//#region input marsk number
function init_controlInputMarskNumber(elementSelector, digits, suffix, useSpinner) {                                                                     //inputMask input number
    if (typeof ($.fn.inputmask) != 'undefined') {
        $(elementSelector).inputmask("numeric", { radixPoint: ".", groupSeparator: ",", digits: digits, autoGroup: true, rightAlign: true, suffix: suffix, removeMaskOnSubmit: true, });
        $(elementSelector).focus(function () {
            this.select();
        })
        $(elementSelector).change(function () {
            var value = $(this).val();
            value = $.trim(value) == "" ? 0 : value;
            $(this).val(value);
        })
        if (useSpinner) {
            $(elementSelector).addClass("has-feedback-right");
            $(elementSelector).after('<span class="fa fa-plus form-control-feedback right spinner-plus" aria-hidden="true"></span>'
                + '<span class="fa fa-minus form-control-feedback right spinner-minus" aria-hidden="true"></span>');

        }
    }
}
//#endregion

//#region select 2
function methodCallBackFormatResultControlSelect2(entity) {
    return entity.Text;
}
function methodCallBackFormatSelectionControlSelect2(entity) {
    return entity.Text;
}
function methodCallBackInitSelectionControlSelect2(element, callback) {
    var id = $(element).val();
    var name = $(element).attr('name');
    var url = $(element).attr('Url')

    if (id != "0") {
        $.ajax({
            url: url,
            type: 'post',
            datatype: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "id": $(element).val(),
            }),
            async: false,
            cache: false,
            success: function (data) {
                if (data != 'null')
                    callback({ 'id': data.Id, 'Text': data.Text });
            }
        })
    }
}

function initiControlSelect2(selector, urlAjax, pageSize, placeholder, objectArrayParamter, methodCallBackFormatResult, methodCallBackFormatSelection, methodCallBackInitSelection, methodCallBackSetDataAjax, flowMultiple) {
    if (!methodCallBackFormatResult || methodCallBackFormatResult == null || methodCallBackFormatResult == undefined)
        methodCallBackFormatResult = methodCallBackFormatResultControlSelect2;

    if (!methodCallBackFormatSelection || methodCallBackFormatSelection == null || methodCallBackFormatSelection == undefined)
        methodCallBackFormatSelection = methodCallBackFormatSelectionControlSelect2;

    if (!methodCallBackInitSelection || methodCallBackInitSelection == null || methodCallBackInitSelection == undefined)
        methodCallBackInitSelection = methodCallBackInitSelectionControlSelect2;

    if (!methodCallBackSetDataAjax || methodCallBackSetDataAjax == null || methodCallBackSetDataAjax == undefined) {
        methodCallBackSetDataAjax = function (term, page) {
            var dataParamter = {
                pageSize: pageSize,
                pageNum: page,
                searchTerm: term,
            };
            $.each(objectArrayParamter, function (name, value) {
                if (name != "pageSize" && name != "pageNum" && name != "searchTerm")
                    dataParamter[name] = value;
            });
            return dataParamter;
        };
    }
    $(selector).select2(
        {
            placeholder: placeholder,
            minimumInputLength: 0,
            allowClear: true,
            multiple: (flowMultiple == undefined || flowMultiple == null) ? false : true,
            dropdownAutoWidth: true,
            formatResult: methodCallBackFormatResult,
            formatSelection: methodCallBackFormatSelection,
            initSelection: methodCallBackInitSelection,
            escapeMarkup: function (m) { return m; },
            ajax: {
                quietMillis: 150,
                type: 'POST',
                url: urlAjax,
                datatype: 'json',
                data: methodCallBackSetDataAjax,
                results: function (data, page) {
                    var more = (page * pageSize) < data.Total;
                    return { results: data.Results, more: more };
                }
            }
        });
}
function initiControlSelect2NoPagging(selector, urlAjax, pageSize, placeholder, objectArrayParamter, methodCallBackFormatResult, methodCallBackFormatSelection, methodCallBackInitSelection, methodCallBackSetDataAjax, flowMultiple) {
    if (!methodCallBackFormatResult || methodCallBackFormatResult == null || methodCallBackFormatResult == undefined)
        methodCallBackFormatResult = methodCallBackFormatResultControlSelect2;

    if (!methodCallBackFormatSelection || methodCallBackFormatSelection == null || methodCallBackFormatSelection == undefined)
        methodCallBackFormatSelection = methodCallBackFormatSelectionControlSelect2;

    if (!methodCallBackInitSelection || methodCallBackInitSelection == null || methodCallBackInitSelection == undefined)
        methodCallBackInitSelection = methodCallBackInitSelectionControlSelect2;

    if (!methodCallBackSetDataAjax || methodCallBackSetDataAjax == null || methodCallBackSetDataAjax == undefined) {
        methodCallBackSetDataAjax = function (term, page) {
            var dataParamter = {
                pageSize: pageSize,
                pageNum: page,
                searchTerm: term,
            };
            $.each(objectArrayParamter, function (name, value) {
                if (name != "pageSize" && name != "pageNum" && name != "searchTerm")
                    dataParamter[name] = value;
            });
            return dataParamter;
        };
    }
    $(selector).select2(
        {
            placeholder: placeholder,
            minimumInputLength: 0,
            allowClear: true,
            multiple: (flowMultiple == undefined || flowMultiple == null) ? false : true,
            dropdownAutoWidth: true,
            formatResult: methodCallBackFormatResult,
            formatSelection: methodCallBackFormatSelection,
            initSelection: methodCallBackInitSelection,
            escapeMarkup: function (m) { return m; },
            ajax: {
                quietMillis: 150,
                type: 'POST',
                url: urlAjax,
                datatype: 'json',
                data: methodCallBackSetDataAjax,
                results: function (data, page) {
                    return { results: data.Results, more: false };
                }
            }
        });
}
//#endregion

//#region Dropzone
function initiControlDropZone(seletor, urlSave, isUseEventInit, urlLoadImage, idEntity) {
    var myDropzone = new Dropzone(seletor, {
        addRemoveLinks: true,
        url: urlSave,
        clickable: true,
        acceptedFiles: '.jpg,.ico,.png,.GIF,.TIFF,.BMP',
        accept: function (file, done) {
            $(".dz-preview").on("click", function () {
                $("#popupImageDropzone").css("display", "block");
                $("#popup-img-caption").html($(this).find('.dz-details .dz-filename span').html());
                var reader = new FileReader();
                var index = $(this).index() - 1;
                reader.addEventListener("load", function () {
                    if ($.trim(reader.result) != "")
                        $("#img-modal").attr("src", reader.result);
                }, false);
                var file = myDropzone.getAcceptedFiles()[index];
                if (file instanceof File)
                    reader.readAsDataURL(file);
                else
                    $("#img-modal").attr("src", file.ImageUrl);

            })
            done()
        },
        init: function () {
            var _that = this;
            if (idEntity > 0 && isUseEventInit) {
                $.ajax({
                    url: urlLoadImage,
                    type: 'post',
                    datatype: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        idEntity: idEntity
                    }),
                    async: false,
                    cache: false,
                    success: function (data) {
                        if (data.length > 0) {
                            $.each(data, function (key, value) {
                                _that.emit("addedfile", value);
                                _that.createThumbnailFromUrl(value, location.host + value.ImageUrl);
                                _that.emit("success", value);
                                _that.emit("complete", value);
                                _that.files.push(value);
                                if (value.previewElement)
                                    $(value.previewElement).find("img").attr("src", value.ImageUrl)
                            });
                        }
                    }
                })
            }
            $(".dz-preview").on("click", function () {
                $("#popupImageDropzone").css("display", "block");
                $("#popup-img-caption").html($(this).find('.dz-details .dz-filename span').html());
                var reader = new FileReader();
                var index = $(this).index() - 1;
                reader.addEventListener("load", function () {
                    if ($.trim(reader.result) != "")
                        $("#img-modal").attr("src", reader.result);
                }, false);
                var file = myDropzone.getAcceptedFiles()[index];
                if (file instanceof File)
                    reader.readAsDataURL(file);
                else
                    $("#img-modal").attr("src", file.ImageUrl);

            })
            $(seletor).after('<div id="popupImageDropzone" class="popup-img"><span class="popup-img-close">&times;</span><img class="popup-img-content" id="img-modal"><div id="popup-img-caption"></div></div>');
            $(document).keyup(function (e) {
                if (e.keyCode == 27) { // escape key maps to keycode `27`
                    if ($("#popupImageDropzone").css("display") == "block")
                        $("#popupImageDropzone").css("display", "none");
                }
            });
            $("#popupImageDropzone").on("keyup", function (e) {
                if (e.keyCode == 27) {
                    $(this).css("display", "none");
                }
            })
            $(".popup-img-close").on("click", function () {
                $(this).closest("div").css("display", "none");
            })
        }
    });
    return myDropzone;
}
//#endregion

//#region tinymce
function initiControlTinymce(seletor, callback) {
    tinymce.init({
        selector: seletor,
        theme: "modern",
        paste_data_images: true,
        height: 300,
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        setup: function (editor) {
            editor.on('init', function (e) {
                e.target.setContent(decodeURIComponent(e.target.startContent));
                $(this.targetElm).after('<input type="file" name="uploadTinymce" class="hidden">');
            });
            editor.on('GetContent', function (e) {
                if (e.format == "html")
                    e.content = encodeURIComponent(e.content);
            });
            if (callback)
                callback(editor);
        },
        file_picker_callback: function (callback, value, meta) {
            if (meta.filetype == 'image') {
                $(this.targetElm).closest("div").find('input[name="uploadTinymce"]').trigger('click');
                $('input[name="uploadTinymce"]').on('change', function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        callback(e.target.result, {
                            alt: ''
                        });
                    };
                    reader.readAsDataURL(file);
                });
            }
        },
        templates: [{
            title: 'Test template 1',
            content: 'Test 1'
        }, {
            title: 'Test template 2',
            content: 'Test 2'
        }]
    });
}
//#endregion

//#endregion

//#region method check number room customer
function CheckNumberRoomCustomer(numberRoom, methodCallBackSucess) {
    $.ajax({
        url: "/Room/CheckNumberRoomCustomerCurrent",
        datatype: "json",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            numberRoom: numberRoom
        }),
        async: true,
        cache: false,
        success: methodCallBackSucess
    })
}
//#endregion

//#region method date
Date.prototype.addHours = function (h) {                                                               //add hours for datetime
    this.setHours(this.getHours() + h);
    return this;
}

JSON.dateParser = function (value) {                                                                    //convert object (datetime from controler) to object datetime jquery
    if (typeof value === 'string') {
        var a = reISO.exec(value);
        if (a)
            return new Date(value);
        a = reMsAjax.exec(value);
        if (a) {
            var b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }
    return value;
};
$(function () {
    $.fn.extend({
        ValidatorSingleInputTime: function () {
            if (this.is("input") && this.val().split(":").length >= 2) {
                var hours = this.val().split(":")[0];
                var minutes = this.val().split(":")[1];
                if (parseInt(hours) > 23 || parseInt(minutes) > 60) {
                    toastr["error"]("Giờ phút không hợp lệ. Xin vui lòng nhập lại", "Thông báo");
                    this.focus();
                    return false;
                }
                return true;
            }
            return false;
        },
        ValidatorCompareInputTime: function (elementTo) {
            if (this.is("input") && this.val().split(":").length >= 2 && elementTo.is("input") && elementTo.val().split(":").length >= 2) {
                var timeFrom = new Date('1/1/2000 ' + this.val());
                var timeTo = new Date('1/1/2000 ' + elementTo.val());
                if (timeFrom >= timeTo) {
                    toastr["error"]("Giờ đến phải lớn hơn giờ đi.", "Thông báo");
                    this.focus();
                    return false;
                }
                return true;
            }
            return false;
        }
    })
})
//#endregion

//#region method link
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1];
    }
}
//#endregion

$(function () {
    //#region method for plugin datatable
    if ($.fn.DataTable != undefined) {
        $.fn.DataTable.Api.register('column().GroupColByVisible()', function () {
            var colspan = this.columns(':visible').count();
            var rowsNode = this.table().rows({ page: 'current' }).nodes();
            var group = null;
            $.each(this.data(), function (index, item) {
                if (item != group) {
                    $(rowsNode).eq(index).before('<tr><td  class="group" colspan="' + colspan + '">' + item + '</td></tr>');
                    group = item;
                }
            })
        })
        $.fn.DataTable.Api.register('column().GroupCol()', function () {
            var colspan = this.columns(':visible').count() - 1;
            var rowsNode = this.table().rows({ page: 'current' }).nodes();
            var group = null;
            $.each(this.data(), function (index, item) {
                if (item != group) {
                    $(rowsNode).eq(index).before('<tr><td  class="group" colspan="' + colspan + '">' + item + '</td></tr>');
                    group = item;
                }
            })
            this.visible(false);
        })
        $.fn.DataTable.Api.register('column().GroupColCutomeTextGroupBaseFunctionCallBack()', function (callBacks) {
            var colspan = this.columns(':visible').count();
            var rowsNode = this.table().rows({ page: 'current' }).nodes();
            var group = null;
            $.each(this.data(), function (index, item) {
                if (item != group) {
                    $(rowsNode).eq(index).before('<tr><td  class="group" colspan="' + colspan + '">' + callBacks(item) + '</td></tr>');
                    group = item;
                }
            })
            this.visible(false);
        })
        $.fn.dataTable.Api.register('column().data().sum()', function () {
            return this.reduce(function (a, b) {
                var x = parseFloat(a) || 0;
                var y = parseFloat(b) || 0;
                return x + y;
            });
        });
        $.fn.DataTable.Api.register('CreateButtonExportExcel', function (opitionButton, seletorContaintButton) {
            $(this.buttons()).each(function () {
                if ($(this.node).closest(seletorContaintButton).length > 0)
                    $(this.node).remove();
            });
            new $.fn.dataTable.Buttons(this, {
                buttons: [opitionButton]
            });
            $(seletorContaintButton).html('');
            this.buttons().container().last().appendTo($(seletorContaintButton));
        })
        //#region use export excel
        var DataTable = $.fn.dataTable;
        DataTable.ext.buttons.ExcelStrings = {
            "_rels/.rels":
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
                '</Relationships>',

            "xl/_rels/workbook.xml.rels":
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
                '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
                '</Relationships>',

            "[Content_Types].xml":
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
                '<Default Extension="xml" ContentType="application/xml" />' +
                '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
                '<Default Extension="jpeg" ContentType="image/jpeg" />' +
                '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
                '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
                '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />' +
                '</Types>',

            "xl/workbook.xml":
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
                '<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>' +
                '<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>' +
                '<bookViews>' +
                '<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>' +
                '</bookViews>' +
                '<sheets>' +
                '<sheet name="" sheetId="1" r:id="rId1"/>' +
                '</sheets>' +
                '</workbook>',

            "xl/worksheets/sheet1.xml":
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
                '<sheetData/>' +
                '<mergeCells count="0"/>' +
                '</worksheet>',

            "xl/styles.xml":
                '<?xml version="1.0" encoding="UTF-8"?>' +
                '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
                '<numFmts count="8">' +
                '<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>' +
                '<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>' +
                '<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>' +
                '<numFmt numFmtId="167" formatCode="0.0%"/>' +
                '<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>' +
                '<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>' +
                '<numFmt numFmtId="170" formatCode="#,##0"/>' +
                '<numFmt numFmtId="171" formatCode="#,##0.00"/>' +
                '</numFmts>' +
                '<fonts count="7" x14ac:knownFonts="1">' +
                '<font>' +
                '<sz val="12" />' +
                '<name val="Times New Roman" />' +
                '</font>' +
                '<font>' +
                '<sz val="12" />' +
                '<name val="Times New Roman" />' +
                '<color rgb="FFFFFFFF" />' +
                '</font>' +
                '<font>' +
                '<sz val="12" />' +
                '<name val="Times New Roman" />' +
                '<b />' +
                '</font>' +
                '<font>' +
                '<sz val="12" />' +
                '<name val="Times New Roman" />' +
                '<i />' +
                '</font>' +
                '<font>' +
                '<sz val="12" />' +
                '<name val="Times New Roman" />' +
                '<u />' +
                '</font>' +
                '<font>' +
                '<sz val="18" />' +
                '<name val="Times New Roman" />' +
                '<b />' +
                '</font>' +
                '<font>' +
                '<sz val="13" />' +
                '<name val="Times New Roman" />' +
                '<b />' +
                '</font>' +
                '</fonts>' +
                '<fills count="6">' +
                '<fill>' +
                '<patternFill patternType="none" />' +
                '</fill>' +
                '<fill/>' + // Excel appears to use this as a dotted background regardless of values
                '<fill>' +
                '<patternFill patternType="solid">' +
                '<fgColor rgb="FFD9D9D9" />' +
                '<bgColor indexed="64" />' +
                '</patternFill>' +
                '</fill>' +
                '<fill>' +
                '<patternFill patternType="solid">' +
                '<fgColor rgb="FFD99795" />' +
                '<bgColor indexed="64" />' +
                '</patternFill>' +
                '</fill>' +
                '<fill>' +
                '<patternFill patternType="solid">' +
                '<fgColor rgb="ffc6efce" />' +
                '<bgColor indexed="64" />' +
                '</patternFill>' +
                '</fill>' +
                '<fill>' +
                '<patternFill patternType="solid">' +
                '<fgColor rgb="ffc6cfef" />' +
                '<bgColor indexed="64" />' +
                '</patternFill>' +
                '</fill>' +
                '</fills>' +
                '<borders count="2">' +
                '<border>' +
                '<left />' +
                '<right />' +
                '<top />' +
                '<bottom />' +
                '<diagonal />' +
                '</border>' +
                '<border diagonalUp="false" diagonalDown="false">' +
                '<left style="thin">' +
                '<color auto="1" />' +
                '</left>' +
                '<right style="thin">' +
                '<color auto="1" />' +
                '</right>' +
                '<top style="thin">' +
                '<color auto="1" />' +
                '</top>' +
                '<bottom style="thin">' +
                '<color auto="1" />' +
                '</bottom>' +
                '<diagonal />' +
                '</border>' +
                '</borders>' +
                '<cellStyleXfs count="1">' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />' +
                '</cellStyleXfs>' +
                '<cellXfs count="73">' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">' +
                '<alignment horizontal="center" vertical="center"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="left"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="center"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="right"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="fill"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment textRotation="90"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="9"  fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="0" fontId="5" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"> ' +
                '<alignment horizontal="center"/>' +
                '</xf>' +
                '<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="center" wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="right" wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="170" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="right" wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="171" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment horizontal="right" wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="6" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment wrapText="1"/>' +
                '</xf>' +
                '<xf numFmtId="0" fontId="6" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
                '<alignment wrapText="1" horizontal="center"/>' +
                '</xf>' +
                '</cellXfs>' +
                '<cellStyles count="1">' +
                '<cellStyle name="Normal" xfId="0" builtinId="0" />' +
                '</cellStyles>' +
                '<dxfs count="0" />' +
                '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />' +
                '</styleSheet>'
        };
        //#endregion
    };
    //#endregion
})

//#region Modal Khách hàng (sử dụng cho việc lưa chọn một hay nhiều khách hàng)
$(function () {
    var htmlModalCustomerChooseDefault =
        '<div id="modalCustomerChoose" class="modal fade" role="dialog">' +
        '<div class="modal-dialog" style="min-width: 70vw; max-width: 70vw;">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '<h4 class="modal-title"><strong>Khách hàng cũ</strong></h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row">' +
        '<table id="datatable-customer-choose-modal" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">' +
        '<thead>' +
        '<tr>' +
        '<th>Họ và tên</th>' +
        '<th>Địa chỉ</th>' +
        '<th>CMND</th>' +
        '<th>Nơi cấp</th>' +
        '<th>Điện thoại 1</th>' +
        '<th>Điện thoại 2</th>' +
        '<th>Email</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody></tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-success">Chọn</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var modalCustomerChoose;
    var getText = function (text) {
        return text == null || text == undefined ? "" : text;
    }
    var arrayColCustomerChooseDefault = [
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.CustomerName);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.Address);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.IDCARDNO);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return row.PlaceIssue == null || row.PlaceIssue == undefined ? "" : getText(row.PlaceIssue.ProvinceName);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.Telephone1);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.Telephone2);
            }
        },
        {
            "data": null, "name": null,
            "render": function (data, type, row) {
                return getText(row.Email);
            }
        },
    ];
    var tableCustomerChoose;
    var urlCustomerChooseDefault = "/Customer/GetCustomerDatatableModal";
    $.ModalCustomerChoose = function (opition) {
        //set option
        var isSelectSingle = opition.isSelectSingle ? opition.isSelectSingle : false;
        var callback = opition.callback;
        var callbackShow = opition.callbackShow;
        var html = opition.html ? opition.html : htmlModalCustomerChooseDefault;
        var arrayCol = opition.arrayCol ? opition.arrayCol : arrayColCustomerChooseDefault;
        var url = opition.url ? opition.url : urlCustomerChooseDefault;
        var callbackLoadTable = opition.callbackLoadTable ? opition.callbackLoadTable : callbackLoadTable;

        if ($("#modalCustomerChoose").length == 0) {
            modalCustomerChoose = $(html);
            modalCustomerChoose.modal({
                backdrop: "static",
                show: "true"
            });
        }
        else
            modalCustomerChoose.modal("show");

        modalCustomerChoose.on('shown.bs.modal', function (e) {
            if (callbackShow)
                callbackShow(modalCustomerChoose);
            tableCustomerChoose = $('#datatable-customer-choose-modal').DataTable({
                "processing": true,
                "serverSide": true,
                "orderMulti": false,
                "order": false,
                "iDisplayLength": 10,
                "lengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
                "info": false,
                "select": {
                    style: isSelectSingle ? 'single' : 'multi'
                },
                "language": {
                    "url": languageDatatable
                },
                "ajax": {
                    "url": url,
                    "type": "POST",
                    "datatype": "json"
                },
                "columns": arrayCol,
                "drawCallback": function (settings) {
                    if (callbackLoadTable)
                        callbackLoadTable(tableCustomerChoose, modalCustomerChoose);

                    modalCustomerChoose.find(".modal-footer button").click(function () {
                        //validate
                        if (tableCustomerChoose.rows().count() <= 0)
                            return;
                        if (tableCustomerChoose.rows('.selected').count() == 0) {
                            alert("Vui lòng chọn một khách hàng");
                            return;
                        }
                        if (callback)
                            callback(tableCustomerChoose.rows('.selected').data());
                        modalCustomerChoose.modal('hide');
                    })
                }
            });
        })
        modalCustomerChoose.on('hidden.bs.modal', function (e) {
            modalCustomerChoose.remove();
            modalCustomerChoose.off("shown.bs.modal");
            modalCustomerChoose.off("hidden.bs.modal");
            tableCustomerChoose = null;
        })
    }
})
//#endregion

//#region các function khác
$(function () {
    $.isEmail = function ($email) {
        if ($.trim($email) == "")
            return false;

        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }
    $.RolePermision = function (buttonAdd, buttonEdit, buttonDelete, callback) {
        var role = localStorage.getItem("RoleFunction");
        if (role == null || role == undefined)
            return;
        role = JSON.parse(role);
        if ($.isArray(role) && role.length > 0) {
            var pathName = location.pathname;
            var r = role.find(function (element) {
                return element.URL == pathName;
            });
            if (r != null && r != undefined) {
                buttonAdd.hide();
                buttonEdit.hide();
                buttonDelete.hide();

                if (r.IsAdd)
                    buttonAdd.show();
                if (r.IsEdit)
                    buttonEdit.show();
                if (r.IsDelete)
                    buttonDelete.show();
                if (callback)
                    callback(r);
            }
        }
    }
})
//#endregion

//#region Create Event EnterKey
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}
//#endregion