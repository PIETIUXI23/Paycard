import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Properties.module.scss';
import axios from 'axios';
import { event } from 'jquery';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const Properties = () => {
    const [keycards, setKeycards] = useState([]);
    const [url] = useState(process.env.REACT_APP_API_HOUSES);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${url}/all`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setKeycards(response.data || []);
            })
            .catch((err) => {
                setError(err.response?.data?.message || err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tòa nhà này?')) {
            try {
                await axios.delete(`${url}/${id}`);
                alert('Tòa nhà đã được xóa thành công!');
                setKeycards((prevKeycards) => prevKeycards.filter((card) => card.id !== id));
            } catch (error) {
                console.error('Lỗi khi xóa tòa nhà:', error.response?.data || error.message);
                alert('Đã xảy ra lỗi khi xóa tòa nhà!');
            }
        }
    };

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className={cx('properties-container')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>
                    <span className={cx('icon', 'building-icon')}></span>
                    Quản Lý Toà Nhà
                </h1>
                <div>
                    <Link to={`/admin/house/add`}>
                        <button className={cx('add-button')}>
                            <span className={cx('icon', 'plus-icon')}></span>
                            Thêm nhà mới
                        </button>
                    </Link>
                    <Link to={`/admin/tentnant`}>
                        <button className={cx('btn_primary')}>
                            <i className="fa fa-users"></i> Khách thuê
                        </button>
                    </Link>
                </div>
            </div>

            <div className={cx('card-list')}>
                {keycards.length === 0 ? (
                    <p>Hiện không có tòa nhà nào để hiển thị.</p>
                ) : (
                    keycards.map((card) => (
                        <Link to={`/admin/house/room/${card.id}`} key={card.id}>
                            <div className={cx('card')}>
                                <div className={cx('card-header')}>
                                    <span className={cx('icon', 'card-icon')}></span>
                                    <span className={cx('card-code')}>{card.cardCode}</span>
                                    <div className={cx('actions')}>
                                        <Link to={`/admin/house/edit/${card.id}`}>
                                            <button className={cx('edit-button')}>
                                                <span className={cx('icon', 'edit-icon')}></span>
                                            </button>
                                        </Link>
                                        <button
                                            className={cx('delete-button')}
                                            onClick={(e) => {
                                                handleDelete(card.id);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <span className={cx('icon', 'trash-icon')}></span>
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('card-body')}>
                                    <p>Tên: {card.name}</p>
                                    <p>Địa chỉ: {card.address}</p>
                                    <p>Tổng phòng: {card.totalRooms}</p>
                                    <p
                                        className={cx('status', {
                                            active: card.status === 1,
                                            inactive: card.status === 0,
                                        })}
                                    >
                                        {card.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Properties;
