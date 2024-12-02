import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useParams } from 'react-router-dom'; // Lấy useParams để lấy id từ URL
import classNames from 'classnames/bind'; // Import classNames
import styles from './EditTenant.module.scss'; // Import styles
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

export default function EditTenant() {
    const { id } = useParams(); // Lấy id người thuê từ URL
    const [url] = useState(process.env.REACT_APP_API_TENANRS); // URL API từ env
    const [tenant, setTenant] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        isRepresentative: 0,
        room: { id: `${id}` },
    });

    // Lấy thông tin người thuê từ API theo ID
    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const response = await axios.get(`${url}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                });
                setTenant(response.data); // Cập nhật tenant với dữ liệu từ API
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người thuê:', error);
                alert('Không thể lấy thông tin người thuê. Vui lòng thử lại sau!');
            }
        };
        fetchTenant();
    }, [id, url]);

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

        // Gửi dữ liệu qua API
        try {
            const response = await axios.put(`${url}/${id}`, tenant, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }); // Sử dụng PUT để chỉnh sửa

            alert('Cập nhật thông tin khách thuê thành công');
            window.history.back();
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người thuê:', error);
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
    };

    return (
        <div className={cx('container')}>
            <form onSubmit={handleSubmit}>
                <h2 className={cx('title')}>Sửa Thông Tin Người Thuê</h2>

                <div className={cx('inputGroup')}>
                    <label htmlFor="fullName" className={cx('label')}>
                        Tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={tenant.fullName}
                        onChange={handleInputChange}
                        placeholder="Nhập tên người thuê"
                        className={cx('input')}
                        required
                    />
                </div>

                <div className={cx('inputGroup')}>
                    <label htmlFor="phoneNumber" className={cx('label')}>
                        Số Điện Thoại
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={tenant.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        className={cx('input')}
                        required
                    />
                </div>

                <div className={cx('inputGroup')}>
                    <label htmlFor="email" className={cx('label')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={tenant.email}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ email"
                        className={cx('input')}
                        required
                    />
                </div>

                <div className={cx('inputGroup')}>
                    <label htmlFor="isRepresentative" className={cx('label')}>
                        Đại Diện Phòng
                    </label>
                    <select
                        id="isRepresentative"
                        name="isRepresentative"
                        value={tenant.isRepresentative}
                        onChange={handleInputChange}
                        className={cx('select')}
                    >
                        <option value={0}>Không</option>
                        <option value={1}>Có</option>
                    </select>
                </div>

                <button type="submit" className={cx('button')}>
                    Cập Nhật Người Thuê
                </button>
            </form>
        </div>
    );
}
