import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditService.module.scss';
import { useParams, useNavigate } from 'react-router-dom'; // Hook để lấy id từ URL và điều hướng
import axios from 'axios';

const cx = classNames.bind(styles);

const EditService = () => {
    const { id } = useParams(); // id của dịch vụ
    const [url] = useState(process.env.REACT_APP_API_ROOM_SERVICES);
    const [newService, setNewService] = useState({
        name: '',
        cost: '',
        createdAt: '',
        unit: '',
        room: {
            id: '',
        },
    });
    const [error, setError] = useState(null);

    // Lấy thông tin dịch vụ khi component được render
    useEffect(() => {
        axios
            .get(`${url}/${id}`)
            .then((response) => {
                const service = response.data;
                setNewService({
                    name: service.name || '',
                    cost: service.cost || '',
                    createdAt: service.createdAt || '',
                    unit: service.unit || '',
                    room: {
                        id: service.room.id || '',
                    },
                });
            })
            .catch((err) => {
                console.error('Lỗi khi lấy thông tin dịch vụ:', err);
                setError(err.response?.data?.message || err.message);
            });
    }, [id, url]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'unit') {
            setNewService((prev) => ({
                ...prev,
                [name]: value ? parseInt(value, 10) : '',
            }));
        } else {
            setNewService((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const editService = () => {
        if (!newService.name || !newService.cost || !newService.unit) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        console.log(newService);

        console.log('Payload gửi lên:', {
            name: newService.name,
            cost: newService.cost,
            createdAt: newService.createdAt,
            unit: newService.unit,
            room: { id: newService.room.id },
        });

        axios
            .put(`${url}/${id}`, {
                name: newService.name,
                cost: newService.cost,
                createdAt: newService.createdAt,
                unit: newService.unit,
                room: {
                    id: newService.room.id,
                },
            })
            .then(() => {
                alert('Dịch vụ đã được cập nhật thành công!');
                window.history.back();
            })
            .catch((err) => {
                console.error('Lỗi khi cập nhật dịch vụ:', err);
                console.log(err.message);
                alert(err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật dịch vụ.');
            });
    };

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Cập Nhật Dịch Vụ Phòng Trọ</h2>

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
                    <input
                        name="unit"
                        type="number"
                        value={newService.unit}
                        onChange={handleInputChange}
                        placeholder="Nhập đơn vị (VD: kWh, m3)"
                        className={cx('input')}
                    />
                </div>

                <button onClick={editService} className={cx('button', 'button-add')}>
                    Sửa dịch vụ
                </button>
            </div>
        </div>
    );
};

export default EditService;
