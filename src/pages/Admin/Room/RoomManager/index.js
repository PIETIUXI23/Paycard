import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './RoomManager.module.scss';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL
import axios from 'axios';
import auth, { getToken } from '~/utils/auth';

// Khai báo cx sử dụng classNames và bind với styles
const cx = classNames.bind(styles);

const RoomManager = () => {
    const { id } = useParams(); // Lấy id housse từ URL
    const [rooms, setRooms] = useState([]);
    const [url] = useState(process.env.REACT_APP_API_HOUSES_ROOMS);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${url}/house/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('API Response:', response.data);
                setRooms(response.data || []); // fallback nếu response trống
            })
            .catch((err) => {
                console.log(`${url}`);
                console.error('API Error:', err.response || err.message);
                setError(err.response?.data?.message || err.message);
            });
    }, []);

    const handleDeleteRoom = (roomId) => {
        axios
            .delete(`${url}/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                alert('Phòng đã được xóa thành công!');
                // Cập nhật lại danh sách phòng sau khi xóa
                setRooms(rooms.filter((room) => room.id !== roomId)); // Loại bỏ phòng khỏi danh sách
            })
            .catch((error) => {
                console.error('Có lỗi khi xóa phòng:', error);
                alert('Đã xảy ra lỗi khi xóa phòng.');
            });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('stats-bar')}>
                <Link to={`/admin/room/add/${id}`}>
                    <button className={cx('btn', 'btn_success')}>
                        <i className="fa fa-university"></i> Thêm phòng
                    </button>
                </Link>
                <span>Còn trống {rooms.filter((room) => room.occupancyStatus === 0).length}</span>
                <span style={{ margin: '0 10px' }}> | </span>
                <span>Đã cho thuê {rooms.filter((room) => room.occupancyStatus === 1).length} </span>
            </div>

            <div className={cx('rooms')}>
                {rooms.map((room) => (
                    <Link to={`/admin/service/${room.id}`} key={room.id}>
                        <div className={cx('room')}>
                            <div className={cx('thumbnail')}>
                                <div className={cx('room-header')}>
                                    <strong>
                                        <i className="fa fa-home" aria-hidden="true"></i> {room.roomNumber}
                                    </strong>
                                </div>
                                <Link to={`/admin/tenants/add/${room.id}`}>
                                    <button className={cx('btn', 'btn-add')}>Thêm khách</button>
                                </Link>

                                <div className={cx('room-details')}>
                                    <p>
                                        <i className="fa fa-user"></i>{' '}
                                        <span
                                            className={cx(
                                                room.occupancyStatus === 1 ? 'status-empty' : 'status-occupied',
                                            )}
                                        >
                                            {room.occupancyStatus === 0 ? 'Chưa có khách' : 'Có khách'}
                                        </span>
                                    </p>
                                    <p>
                                        <i className="fa fa-money"></i>{' '}
                                        <span className={cx('price')}>{room.price.toLocaleString()} VNĐ</span>
                                    </p>
                                </div>
                                <div className={cx('room-actions')}>
                                    <Link to={`/admin/room/edit/${room.id}`}>
                                        <button
                                            className={cx('btn', 'btn-primary')}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Ngăn sự kiện lan lên thẻ `div`
                                            }}
                                        >
                                            <i className="fa fa-edit"></i> Chỉnh sửa
                                        </button>
                                    </Link>
                                    <button
                                        className={cx('btn', 'btn-danger')}
                                        onClick={(e) => {
                                            e.preventDefault(); // Ngăn sự kiện lan lên thẻ `div`
                                            handleDeleteRoom(room.id);
                                        }}
                                    >
                                        <i className="fa fa-trash"></i> Xóa
                                    </button>

                                    <Link to={`/admin/inpWE`}>
                                        <button
                                            className={cx('btn', 'btn-info')}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Ngăn sự kiện lan lên thẻ `div`
                                            }}
                                        >
                                            <i className="fa fa-credit-card"></i> Thanh toán
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RoomManager;
