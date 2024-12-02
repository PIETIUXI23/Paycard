import React from "react";

const MaintenanceNotice = () => {
    return (
        <div style={{ backgroundColor: "lightgoldenrodyellow", color: "steelblue", padding: "5px", display: "none" }}>
            <h3 style={{ color: "red" }}>Thông báo bảo trì</h3>
            Vì lý do khách quan, hệ thống sẽ tạm gián đoạn trong 4 tiếng, mong quý khách hàng thông cảm!
            <br />- Thời gian: <b>22:30 đến 02:30</b>
            <br />- Ngày: <b>Thứ 4, 10/04/2024</b> (<span style={{ color: "red" }}>đêm hôm nay</span>)
        </div>
    );
};

export default MaintenanceNotice;
