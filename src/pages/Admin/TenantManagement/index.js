import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './TenantManagement.module.scss';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const TenantManagement = () => {
    const [tenants, setTenants] = useState([]);
    const [url] = useState(process.env.REACT_APP_API_TENANRS);
    const [urlRoom] = useState(process.env.REACT_APP_API_HOUSES_ROOMS);

    // Lấy dữ liệu từ API của tất cả khách thuê
    useEffect(() => {
        axios
            .get(`${url}/all`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setTenants(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, [url]);

    const handleCheckboxChange = async (index) => {
        const updatedTenants = [...tenants];
        updatedTenants[index].isRepresentative = updatedTenants[index].isRepresentative === 1 ? 0 : 1;
        setTenants(updatedTenants);
    };

    const handleDeleteTenant = async (tenantId) => {
        if (!tenantId) {
            console.log('tenantId không hợp lệ:', tenantId);
            return;
        }

        try {
            const response = await axios.get(`${url}/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (window.confirm('Bạn có chắc chắn muốn xóa khách thuê này không?')) {
                await axios.delete(`${url}/${tenantId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                });
                setTenants((prevTenants) => prevTenants.filter((tenant) => tenant.id !== tenantId));
                alert('Xóa khách thuê thành công!');

                // console.log('Tenants: ', tenants);
                // console.log('response.data.room.id', response.data.room.id);
                const totalTenantByIdRoom = tenants.filter((item) => item.room.id === response.data.room.id).length - 1;
                // console.log(totalTenantByIdRoom);
                if (totalTenantByIdRoom === 0) {
                    const roomResponse = await axios.get(`${urlRoom}/${response.data.room.id}`, {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    // console.log('roomResponse', roomResponse);
                    const updatedRoom = { ...roomResponse.data, occupancyStatus: 0 };
                    // console.log('Cập nhật ', updatedRoom);
                    try {
                        await axios.put(`${urlRoom}/${response.data.room.id}`, updatedRoom);
                    } catch (error) {
                        console.error('Lỗi khi cập nhật phòng:', error.response || error.message);
                    }
                }
            }
        } catch (error) {
            console.error('Lỗi khi xóa khách thuê:', error);
            alert('Không thể xóa khách thuê. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Quản Lý Khách Thuê</h2>
            {/* 
            <div className={cx('actions')}>
                <button className={cx('addButton')}>Thêm Khách Thuê</button>
            </div> */}

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Tên nhà</th>
                        <th>Số phòng</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Đại diện</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map((tenant) => (
                        <tr key={tenant.id}>
                            {' '}
                            {/* Sử dụng tenant.id làm key */}
                            <td>
                                <span className={cx('data')}>{tenant.room.house.name}</span>
                            </td>
                            <td>
                                <span className={cx('data')}>{tenant.room.roomNumber}</span>
                            </td>
                            <td>
                                <span className={cx('data')}>{tenant.fullName}</span>
                            </td>
                            <td>
                                <span className={cx('data')}>{tenant.phoneNumber}</span>
                            </td>
                            <td>
                                <span className={cx('data')}>{tenant.email}</span>
                            </td>
                            <td className={cx('center')}>
                                <input
                                    type="checkbox"
                                    checked={tenant.isRepresentative === 1}
                                    onChange={() => handleCheckboxChange(tenant.id)}
                                />
                            </td>
                            <td>
                                <div className={cx('action-buttons')}>
                                    <Link to={`/admin/tenants/edit/${tenant.id}`}>
                                        <button className={cx('editButton')}>Sửa</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteTenant(tenant.id)}
                                        className={cx('deleteButton')}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TenantManagement;
