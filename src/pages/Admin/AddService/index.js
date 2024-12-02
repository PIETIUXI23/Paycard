import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddService.module.scss';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL
import axios from 'axios';

const cx = classNames.bind(styles);

const AddRoom = () => {
    const { id } = useParams();
    const [url] = useState(process.env.REACT_APP_API_ROOM_SERVICES);
    const [newService, setNewService] = useState({
        name: '',
        cost: '',
        createdAt: new Date().toISOString().split('T')[0],
        unit: '', // Chuyển thành giá trị số nguyên
        room: {
            id: `${id}`,
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Cập nhật giá trị cho unit và các trường khác
        setNewService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addService = () => {
        if (!newService.name || !newService.cost || !newService.unit) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Gửi yêu cầu POST để thêm dịch vụ mới
        axios
            .post(`${url}`, {
                name: newService.name,
                cost: parseFloat(newService.cost),
                createdAt: new Date().toISOString().split('T')[0],
                unit: newService.unit,
                room: {
                    id: `${id}`,
                },
            })
            .then((response) => {
                // Reset form
                setNewService({
                    name: '',
                    cost: '',
                    createdAt: new Date().toISOString().split('T')[0],
                    unit: '', // Sửa thành kiểu số nguyên
                    room: {
                        id: `${id}`,
                    },
                });
                alert('Dịch vụ đã được thêm thành công!');
                window.history.back();
            })
            .catch((error) => {
                console.error('Có lỗi khi thêm dịch vụ:', error);
                alert('Đã xảy ra lỗi khi thêm dịch vụ.');
            });
    };


    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Quản Lý Dịch Vụ Phòng Trọ</h2>

            <div className={cx('form')}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Tên Dịch Vụ</label>
                    <input
                        name="name"
                        value={newService.name}
                        onChange={handleInputChange}
                        placeholder="Nhập tên dịch vụ"
                        className={cx('input')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Giá</label>
                    <input
                        name="cost"
                        type="number"
                        value={newService.cost}
                        onChange={handleInputChange}
                        placeholder="Nhập giá"
                        className={cx('input')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Đơn Vị</label>
                    <select
                        name="unit"
                        value={newService.unit}
                        onChange={handleInputChange}
                        className={cx('input')}
                    >
                        <option value="">Chọn đơn vị</option>
                        <option value="1">Theo người</option>
                        <option value="2">Theo chỉ số</option>
                        <option value="3">Theo phòng</option>
                    </select>
                </div>

                <button onClick={addService} className={cx('button', 'button-add')}>
                    Thêm Dịch Vụ
                </button>
            </div>
        </div>
    );
};

export default AddRoom;
