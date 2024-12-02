import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RoomHeader.module.scss';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RoomHeader = () => {
    const { id } = useParams(); // Lấy id housse từ URL
    const [roomStatus, setRoomStatus] = useState('-1');
    const [paymentStatus, setPaymentStatus] = useState('-1');
    const [roomName, setRoomName] = useState('');

    const handleSearch = () => {
        console.log('Searching with:', { roomStatus, paymentStatus, roomName });
    };

    return (
        <div className={cx('container')}>
            {/* Title */}
            {/* <div className={cx('title')}>
                <h2>Danh sách phòng</h2>
            </div> */}

            {/* Search Controls */}
            {/* <div className={cx('search_controls')}> */}
            {/* Room Status Select */}
            {/* <div className={cx('select_container')}>
                    <select
                        value={roomStatus}
                        onChange={(e) => setRoomStatus(e.target.value)}
                        className={cx('form_select')}
                    >
                        <option value="-1">- Trạng thái phòng -</option>
                        <option value="1">Còn trống</option>
                        <option value="2">Đã cho thuê</option>
                    </select>
                </div> */}

            {/* Payment Status Select */}
            {/* <div className={cx('select_container')}>
                    <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className={cx('form_select')}
                    >
                        <option value="-1">- Trạng thái phí -</option>
                        <option value="2">Chưa thu phí</option>
                    </select>
                </div> */}

            {/* Room Name Input */}
            {/* <div className={cx('input_container')}>
                    <input
                        type="text"
                        placeholder="Phòng"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className={cx('form_input')}
                    />
                </div> */}

            {/* Search Button */}
            {/* <button onClick={handleSearch} className={cx('btn', 'btn_primary')}>
                    <i className="fa fa-search"></i> Tìm kiếm
                </button> */}
            {/* </div> */}

            {/* Stats Bar */}
            {/* <div className={cx('stats_bar')}>
                <span className={cx('stat_item')}>Còn trống {} </span>
                <span className={cx('stat_item')}>Đã cho thuê </span>
            </div> */}

            {/* Action Buttons */}
            <div className={cx('action_buttons')}>
                <Link to={`/admin/room/add/${id}`}>
                    <button className={cx('btn', 'btn_success')}>
                        <i className="fa fa-university"></i> Thêm phòng
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RoomHeader;
