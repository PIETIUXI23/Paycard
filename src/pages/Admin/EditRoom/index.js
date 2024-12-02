import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './EditRoom.module.scss';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const EditRoom = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [url] = useState(process.env.REACT_APP_API_HOUSES_ROOMS);
    const [room, setRoom] = useState({
        price: 0,
        roomNumber: '',
        description: '',
        occupancyStatus: 0,
        maxOccupants: 0,
        createdAt: new Date().toISOString().split('T')[0],
        house: {
            id: '',
        },
    });

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`${url}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                }); // Gọi API với id
                setRoom({
                    price: response.data.price || 0,
                    roomNumber: response.data.roomNumber || '',
                    description: response.data.description || '',
                    occupancyStatus: response.data.occupancyStatus || 0,
                    maxOccupants: response.data.maxOccupants || 0,
                    createdAt: response.data.createdAt
                        ? new Date(response.data.createdAt).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0],
                    house: {
                        id: response.data.house.id,
                    },
                });
            } catch (error) {
                console.error('Error fetching room data:', error);
                alert('Đã xảy ra lỗi khi tải thông tin phòng.');
            }
        };

        if (id) {
            fetchRoom(); // Lấy thông tin phòng khi có id
        }
    }, [id, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]:
                name === 'price' || name === 'roomNumber' || name === 'maxOccupants' || name === 'occupancyStatus'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(room);
            const response = await axios.put(
                `${url}/${id}`,
                {
                    price: room.price,
                    roomNumber: room.roomNumber,
                    description: room.description,
                    occupancyStatus: room.occupancyStatus,
                    maxOccupants: room.maxOccupants,
                    createdAt: new Date().toISOString().split('T')[0],
                    house: {
                        id: room.house.id,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            alert('Cập nhật thông tin phòng thành công!');
            window.history.back(); // Quay lại trang trước
        } catch (error) {
            console.error('Có lỗi khi cập nhật thông tin phòng:', error);
            alert('Đã xảy ra lỗi khi cập nhật thông tin phòng.');
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Chỉnh Sửa Thông Tin Phòng</h2>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('grid')}>
                    <div className={cx('formGroup')}>
                        <label htmlFor="roomNumber" className={cx('label')}>
                            Số Phòng
                        </label>
                        <input
                            type="number"
                            id="roomNumber"
                            name="roomNumber"
                            value={room.roomNumber}
                            onChange={handleChange}
                            placeholder="Nhập số phòng"
                            required
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('formGroup')}>
                        <label htmlFor="price" className={cx('label')}>
                            Giá Phòng
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={room.price}
                            onChange={handleChange}
                            placeholder="Nhập giá phòng"
                            step="0.01"
                            required
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('formGroup')}>
                        <label htmlFor="maxOccupants" className={cx('label')}>
                            Số Người Tối Đa
                        </label>
                        <input
                            type="number"
                            id="maxOccupants"
                            name="maxOccupants"
                            value={room.maxOccupants}
                            onChange={handleChange}
                            placeholder="Nhập số người tối đa"
                            required
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('formGroup')}>
                        <label htmlFor="occupancyStatus" className={cx('label')}>
                            Trạng Thái Phòng
                        </label>
                        <select
                            id="occupancyStatus"
                            name="occupancyStatus"
                            value={room.occupancyStatus}
                            onChange={handleChange}
                            className={cx('select')}
                        >
                            <option value="0">Trống</option>
                            <option value="1">Đang Sử Dụng</option>
                        </select>
                    </div>

                    <div className={cx('formGroup')}>
                        <label htmlFor="createdAt" className={cx('label')}>
                            Ngày Tạo
                        </label>
                        <input
                            type="date"
                            id="createdAt"
                            name="createdAt"
                            value={room.createdAt}
                            onChange={handleChange}
                            required
                            className={cx('input')}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
                        Mô Tả
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={room.description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả phòng"
                        required
                        className={cx('fullWidth')}
                    />
                </div>

                <button type="submit" className={cx('button')}>
                    Lưu Thay Đổi
                </button>
            </form>
        </div>
    );
};

export default EditRoom;
