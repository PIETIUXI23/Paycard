import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL
import classNames from 'classnames/bind';
import styles from './AddRoom.module.scss';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const AddRoom = () => {
    const { id } = useParams(); // Lấy id housse từ URL
    const [url] = useState(process.env.REACT_APP_API_HOUSES_ROOMS);
    const [room, setRoom] = useState({
        price: '',
        roomNumber: '',
        description: '',
        occupancyStatus: 0,
        maxOccupants: '',
        createdAt: new Date().toISOString().split('T')[0],
        house: {
            id: `${id}`,
        },
    });

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
            const response = await axios.post(
                `${url}`,
                {
                    price: room.price,
                    roomNumber: room.roomNumber,
                    description: room.description,
                    occupancyStatus: room.occupancyStatus,
                    maxOccupants: room.maxOccupants,
                    createdAt: new Date().toISOString().split('T')[0],
                    house: {
                        id: `${id}`,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            alert('Thêm phòng thành công!');
            window.history.back(); // Quay lại trang trước
        } catch (error) {
            console.error('Có lỗi khi thêm phòng:', error);
            alert('Đã xảy ra lỗi khi thêm phòng.');
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Thêm Thông Tin Phòng</h2>
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
                    Thêm Phòng
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
