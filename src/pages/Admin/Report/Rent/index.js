//Day la day la bao cao khach dang thue
import React from "react";

function Rent() {
    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="x_panel">
                <div className="x_title">
                    <h2 style={{ display: 'inline-block' }}>
                        <strong>Danh sách khách thuê phòng</strong>
                    </h2>
                    <div className="clearfix"></div>
                </div>
                <div className="x_content">
                    <form data-parsley-validate className="form-horizontal form-label-left" method="post">
                        {/* Form Filters */}
                        <div className="form-group">
                            <label
                                className="col-fhd-1 col-xlg-1 col-md-1 col-sm-12 col-xs-1"
                                htmlFor="dateTimeFrom"
                            >
                                Ngày thuê từ
                            </label>
                            <div className="col-fhd-2 col-xlg-2 col-md-2 col-sm-12 col-xs-2">
                                <input type="text" id="dateTimeFrom" name="dateTimeFrom" className="form-control" />
                            </div>
                            <label
                                className="col-fhd-1 col-xlg-1 col-md-1 col-sm-12 col-xs-1"
                                htmlFor="dateTimeTo"
                            >
                                đến
                            </label>
                            <div className="col-fhd-2 col-xlg-2 col-md-2 col-sm-12 col-xs-2">
                                <input type="text" id="dateTimeTo" name="dateTimeTo" className="form-control" />
                            </div>
                            <div className="col-fhd-3 col-xlg-3 col-md-3 col-sm-12 col-xs-1" style={{ float: 'right' }}>
                                <button className="btn btn-warning" type="button" id="watchButton">
                                    <i className="fa fa-search"></i> Xem
                                </button>
                                <div id="exportExcel" style={{ display: 'inline-block' }}></div>
                            </div>
                        </div>

                        {/* Form Selects */}
                        <div className="form-group">
                            <label className="col-fhd-1 col-xlg-1 col-md-1 col-sm-12 col-xs-1">Nhà</label>
                            <div className="col-fhd-2 col-xlg-2 col-md-2 col-sm-12 col-xs-2">
                                <input
                                    type="text"
                                    style={{ width: '100%' }}
                                    name="areaID"
                                    id="areaID"
                                    url="/Global/GetAreaBaseId"
                                    className="form-control"
                                />
                            </div>
                            <label className="col-fhd-1 col-xlg-1 col-md-1 col-sm-12 col-xs-1">Phòng</label>
                            <div className="col-fhd-2 col-xlg-2 col-md-2 col-sm-12 col-xs-2">
                                <input
                                    type="text"
                                    style={{ width: '100%' }}
                                    name="roomID"
                                    id="roomID"
                                    url="/Global/GetRoomBaseId"
                                    className="form-control"
                                />
                            </div>
                            <label className="col-fhd-1 col-xlg-1 col-md-1 col-sm-12 col-xs-1">Trạng thái</label>
                            <div className="col-fhd-2 col-xlg-2 col-md-2 col-sm-12 col-xs-2">
                                <select style={{ width: '100%' }} id="statusRent" className="form-control">
                                    <option value="-1">Tất cả</option>
                                    <option value="0">Đang thuê</option>
                                    <option value="1">Đã trả phòng</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="form-group">
                            <table
                                id="table"
                                className="table table-striped table-bordered dt-responsive nowrap"
                                cellspacing="0"
                                width="100%"
                            >
                                <thead>
                                    <tr>
                                        <th>Họ tên khách</th>
                                        <th>CMND/ CCCD</th>
                                        <th>Địa chỉ</th>
                                        <th>Điện thoại</th>
                                        <th>Nhà</th>
                                        <th>Thuê phòng</th>
                                        <th>Từ ngày</th>
                                        <th>Đến ngày</th>
                                        <th>Ngày hết hạn HĐ</th>
                                        <th>Trạng thái</th>
                                        <th>Đơn giá (VNĐ)</th>
                                        <th>Tiền cọc (VNĐ)</th>
                                        <th>Tổng tiền phí (VNĐ)</th>
                                        <th>Đã trả (VNĐ)</th>
                                        <th>Còn lại (VNĐ)</th>
                                        <th>Người giới thiệu</th>
                                        <th>Ngày sinh</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
            <scripts src='./reportCustomerRent.js'></scripts>
        </div>
    );
}

export default Rent;
