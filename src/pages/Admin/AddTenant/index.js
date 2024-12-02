import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useParams } from 'react-router-dom';
import './AddTenant.module.scss';
import { getToken } from '~/utils/auth';

export default function AddTenant() {
    const { id } = useParams(); // Lấy id phòng từ URL
    const [url] = useState(process.env.REACT_APP_API_TENANRS); // URL API từ env
    const [urlRoom] = useState(process.env.REACT_APP_API_HOUSES_ROOMS);
    const [tenant, setTenant] = useState({
        // cho việc thêm khách hàng
        fullName: '',
        phoneNumber: '',
        email: '',
        isRepresentative: 0,
        room: {
            id: `${id}`,
        },
    });

    const [alltenant, setallTenant] = useState([]); // Đổi thành mảng chứa thông tin tất cả khách thuê

    const [room, setRoom] = useState(null); // Dữ liệu phòng

    // Lấy thông tin phòng theo id
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`${urlRoom}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                }); // API để lấy dữ liệu phòng theo id
                setRoom(response.data); // Lưu dữ liệu phòng vào state
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu phòng:', error);
                alert('Không thể lấy thông tin phòng. Vui lòng thử lại sau.');
            }
        };
        fetchRoomData();
    }, [id, urlRoom]);

    // Lấy thông tin của tất cả khách thuê
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`${url}/all`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                }); // API để lấy dữ liệu của khách thuê
                setallTenant(response.data); // Lưu dữ liệu khách thuê vào state
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu khách thuê:', error);
                alert('Không thể lấy thông tin khách thuê');
            }
        };
        fetchRoomData();
    }, [url]);

    // Hàm tính số người thuê theo id phòng
    const totalTenantByIdRoom = () => {
        // Lọc các khách thuê có id phòng tương ứng và trả về số lượng
        const filtered = alltenant.filter((item) => item.room.id === parseInt(id));
        return filtered.length;
    };

    // Kiểm tra xem có thể thêm người thuê hay không
    const canAddTenant = () => {
        if (room && room.maxOccupants !== undefined) {
            // So sánh tổng số người thuê với số người tối đa của phòng
            return totalTenantByIdRoom() < room.maxOccupants;
        }
        return true;
    };

    // Xử lý sự kiện thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTenant((prevTenant) => ({
            ...prevTenant,
            [name]: name === 'isRepresentative' ? parseInt(value) : value,
        }));
    };

    // Xử lý sự kiện submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenant.fullName || !tenant.phoneNumber || !tenant.email) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (!canAddTenant()) {
            alert('Không thể thêm người thuê. Phòng đã đủ người!');
            return;
        }

        // Cập nhật occupancyStatus của phòng
        const updatedRoom = {
            ...room,
            occupancyStatus: 1, // Thay đổi occupancyStatus thành 1
        };

        // Cập nhật dữ liệu phòng trên server
        await axios.put(`${urlRoom}/${id}`, updatedRoom, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        }); // API PUT cập nhật phòng

        // Cập nhật lại state của phòng
        setRoom(updatedRoom);

        // Gửi dữ liệu qua API
        try {
            const response = await axios.post(`${url}`, tenant, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }); // Thay đổi URL theo đúng API

            // Reset form sau khi gửi thành công
            setTenant({
                fullName: '',
                phoneNumber: '',
                email: '',
                isRepresentative: 0,
                room: {
                    id: `${id}`,
                },
            });

            alert('Thêm khách thuê thành công');
            window.history.back();
        } catch (error) {
            console.error('Lỗi khi thêm người thuê:', error);
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Thêm Người Thuê Phòng</h2>

                <div>
                    <label htmlFor="fullName">Tên</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={tenant.fullName}
                        onChange={handleInputChange}
                        placeholder="Nhập tên người thuê"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber">Số Điện Thoại</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={tenant.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={tenant.email}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="isRepresentative">Đại Diện Phòng</label>
                    <select
                        id="isRepresentative"
                        name="isRepresentative"
                        value={tenant.isRepresentative}
                        onChange={handleInputChange}
                    >
                        <option value={0}>Không</option>
                        <option value={1}>Có</option>
                    </select>
                </div>

                <button type="submit">Thêm Người Thuê</button>
            </form>
        </div>
    );
}
