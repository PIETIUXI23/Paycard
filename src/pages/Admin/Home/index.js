import React, { useEffect } from 'react';
import 'datatables.net-bs/css/dataTables.bootstrap.min.css'; // Bootstrap DataTables CSS
import 'datatables.net-buttons-bs/css/buttons.bootstrap.min.css'; // DataTables Buttons CSS
import 'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css'; // DataTables FixedHeader CSS
import 'datatables.net-responsive-bs/css/responsive.bootstrap.min.css'; // DataTables Responsive CSS
import 'datatables.net-scroller-bs/css/scroller.bootstrap.min.css'; // DataTables Scroller CSS
import 'datatables.net'; // DataTables JS
import { Chart } from 'chart.js';
import '~/Content/Chart.css';
//import '~/Scripts/home.js';
import './index.module.scss';

function Home() {
    // Fake data for the tables
    const roomData = [
        { house: 'Nhà A', room: 'Phòng 101' },
        { house: 'Nhà B', room: 'Phòng 102' },
        { house: 'Nhà C', room: 'Phòng 103' },
    ];

    const customerDebitData = [
        { house: 'Nhà A', room: 'Phòng 101', customer: 'Khách Hàng 1', month: 'Tháng 11', amount: '1,500,000 VNĐ' },
        { house: 'Nhà B', room: 'Phòng 102', customer: 'Khách Hàng 2', month: 'Tháng 11', amount: '2,000,000 VNĐ' },
        { house: 'Nhà C', room: 'Phòng 103', customer: 'Khách Hàng 3', month: 'Tháng 11', amount: '1,800,000 VNĐ' },
    ];

    useEffect(() => {
        // Initialize DataTables
        $('#tableRoomEmty').DataTable();
        $('#tableCustomerDebit').DataTable();

        // Fake data for charts
        const roomStatusData = [
            { StatusName: 'Đang thuê', PercentValue: 60 },
            { StatusName: 'Phòng trống', PercentValue: 40 },
        ];
        const saleData = [
            { MonthID: 'Tháng 1', TotalAmount: 5000000 },
            { MonthID: 'Tháng 2', TotalAmount: 7000000 },
            { MonthID: 'Tháng 3', TotalAmount: 6500000 },
            { MonthID: 'Tháng 4', TotalAmount: 8000000 },
            { MonthID: 'Tháng 5', TotalAmount: 9000000 },
        ];

        // Initialize Room Status Chart
        const roomStatusCtx = document.getElementById('roomStatusChart').getContext('2d');
        new Chart(roomStatusCtx, {
            type: 'pie',
            data: {
                labels: roomStatusData.map((data) => data.StatusName),
                datasets: [
                    {
                        data: roomStatusData.map((data) => data.PercentValue),
                        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    position: 'top',
                },
            },
        });

        // Initialize Sales Chart
        const salesCtx = document.getElementById('saleChart').getContext('2d');
        new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: saleData.map((data) => data.MonthID),
                datasets: [
                    {
                        label: 'Doanh thu (VNĐ)',
                        data: saleData.map((data) => data.TotalAmount),
                        backgroundColor: saleData.map(
                            () =>
                                `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                                    Math.random() * 256,
                                )}, ${Math.floor(Math.random() * 256)})`,
                        ),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString() + ' VNĐ';
                            },
                        },
                    },
                },
            },
        });
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
            <div className="row" style={{ height: 'calc(50vh - 30px)', marginTop: '50px' }}>
                {/* Room status panel */}
                <div className="col-md-6">
                    <div className="x_panel">
                        <div className="x_title">
                            <h3>
                                <strong>Trạng thái phòng</strong>
                            </h3>
                        </div>
                        <div className="x_content">
                            <form id="formRoomStatus">
                                <div id="chartjs-legend" className="noselect">
                                    <ul>
                                    </ul>
                                </div>
                                <div className="row">
                                    <canvas id="roomStatusChart"></canvas>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Sales chart panel */}
                <div className="col-md-6">
                    <div className="x_panel">
                        <div className="x_title">
                            <h3>
                                <strong>Doanh thu (VNĐ)</strong>
                            </h3>
                        </div>
                        <div className="x_content">
                            <canvas id="saleChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table sections */}
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-6 col-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h3>
                                <strong>Danh sách phòng trống</strong>
                            </h3>
                        </div>
                        <div className="x_content">
                            <form id="formRoomEmty">
                                <table
                                    id="tableRoomEmty"
                                    className="table table-striped table-bordered dt-responsive nowrap"
                                    cellspacing="0"
                                    width="100%"
                                >
                                    <thead>
                                        <tr>
                                            <th>Nhà</th>
                                            <th>Phòng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomData.map((room, index) => (
                                            <tr key={index}>
                                                <td>{room.house}</td>
                                                <td>{room.room}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Customer debts table */}
                <div className="col-md-6 col-sm-12 col-xs-6 col-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h3>
                                <strong>Danh sách khách nợ tiền phòng</strong>
                            </h3>
                        </div>
                        <div className="x_content">
                            <form id="forCustomerDebit">
                                <table
                                    id="tableCustomerDebit"
                                    className="table table-striped table-bordered dt-responsive nowrap"
                                    cellspacing="0"
                                    width="100%"
                                >
                                    <thead>
                                        <tr>
                                            <th>Nhà</th>
                                            <th>Phòng</th>
                                            <th>Khách</th>
                                            <th>Tháng</th>
                                            <th>Số tiền (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerDebitData.map((debt, index) => (
                                            <tr key={index}>
                                                <td>{debt.house}</td>
                                                <td>{debt.room}</td>
                                                <td>{debt.customer}</td>
                                                <td>{debt.month}</td>
                                                <td>{debt.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
