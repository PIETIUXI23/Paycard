import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './InputWaterElectric.module.scss';

const cx = classNames.bind(styles);

function InputWaterElectric() {
    const { id } = useParams();
    const [roomServices, setRoomServices] = useState([]);
    const [serviceInputs, setServiceInputs] = useState({});
    const [tenantCount, setTenantCount] = useState(0); // Số người trong phòng
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchRoomServices();
        fetchTenantCount();
    }, [id]);

    // Fetch room services
    const fetchRoomServices = async () => {
        try {
            const response = await fetch(`http://localhost:8080/room-services/room/${id}`);
            const data = await response.json();
            setRoomServices(data);

            // Khởi tạo state cho các input
            const inputs = {};
            data.forEach(service => {
                if (service.unit === 2) {
                    inputs[service.id] = 0;
                }
            });
            setServiceInputs(inputs);
        } catch (error) {
            console.error('Error fetching room services:', error);
        }
    };

    // Fetch số người trong phòng
    const fetchTenantCount = async () => {
        try {
            const response = await fetch(`http://localhost:8080/tenants/count/${id}`);
            const count = await response.json();
            setTenantCount(count);
        } catch (error) {
            console.error('Error fetching tenant count:', error);
        }
    };

    // Tính thành tiền cho một dịch vụ
    const calculateAmount = (service) => {
        switch (service.unit) {
            case 1: // Giữ nguyên giá
                return service.cost;
            case 2: // Nhân với chỉ số nhập vào
                return service.cost * (serviceInputs[service.id] || 0);
            case 3: // Nhân với số người
                return service.cost * tenantCount;
            default:
                return 0;
        }
    };

    // Cập nhật input chỉ số
    const handleInputChange = (serviceId, value) => {
        const numValue = Math.max(0, Number(value)); // Đảm bảo giá trị không âm
        setServiceInputs(prev => ({
            ...prev,
            [serviceId]: numValue
        }));
    };
    // Add these functions in your InputWaterElectric component
    const handleCreateInvoice = async () => {
        try {
            // Get tenant email from room id
            const tenantResponse = await fetch(`http://localhost:8080/tenants/room/${id}`);
            const tenants = await tenantResponse.json();

            // Find representative tenant (isRepresentative = 1)
            const representativeTenant = tenants.find(tenant => tenant.isRepresentative === 1);

            if (!representativeTenant) {
                alert('Không tìm thấy người đại diện phòng!');
                return;
            }

            // Create invoice request payload
            const invoiceRequest = {
                roomId: parseInt(id),
                total: totalAmount,
                email: representativeTenant.email,
                message: `Hóa đơn phòng ${id} tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`
            };

            // Call API to create invoice and get payment link
            const response = await fetch('http://localhost:8080/invoices/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceRequest)
            });

            if (!response.ok) {
                throw new Error('Failed to create invoice');
            }

            const result = await response.text();
            alert(result);

        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('Có lỗi xảy ra khi tạo hóa đơn!');
        }
    };

    // Tính tổng tiền
    useEffect(() => {
        const total = roomServices.reduce((sum, service) => {
            return sum + calculateAmount(service);
        }, 0);
        setTotalAmount(total);
    }, [roomServices, serviceInputs, tenantCount]);

    return (
        <div className={cx('meter-reading')}>
            <div className={cx('meter-reading__form')}>
                <h2>Nhập Chỉ Số Điện Và Nước</h2>

                <div className={cx('services-table')}>
                    <h3>Danh sách dịch vụ phòng</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên dịch vụ</th>
                                <th>Đơn giá</th>
                                <th>Loại tính</th>
                                <th>Chỉ số</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomServices.map(service => (
                                <tr key={service.id}>
                                    <td>{service.name}</td>
                                    <td>{service.cost.toLocaleString()} VNĐ</td>
                                    <td>
                                        {service.unit === 1 && "Cố định"}
                                        {service.unit === 2 && "Theo chỉ số"}
                                        {service.unit === 3 && "Theo người"}
                                    </td>
                                    <td>
                                        {service.unit === 2 ? (
                                            <input
                                                type="number"
                                                min="0"
                                                value={serviceInputs[service.id] || ""}
                                                onChange={(e) => handleInputChange(service.id, e.target.value)}
                                                className={cx('service-input')}
                                            />
                                        ) : service.unit === 3 ? (
                                            tenantCount
                                        ) : (
                                            "1"
                                        )}
                                    </td>
                                    <td>{calculateAmount(service).toLocaleString()} VNĐ</td>
                                </tr>
                            ))}
                            <tr className={cx('total-row')}>
                                <td colSpan="4" className={cx('total-label')}>Tổng cộng:</td>
                                <td className={cx('total-amount')}>{totalAmount.toLocaleString()} VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className={cx('create-invoice-btn')}
                        onClick={handleCreateInvoice}
                    >
                        Tạo hóa đơn và gửi link thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputWaterElectric;