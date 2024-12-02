import React, { useState, useEffect } from 'react';
import styles from './Service.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Hook để lấy id từ URL

const cx = classNames.bind(styles);

const ServiceList = () => {

    const { id } = useParams();
    const [services, setServices] = useState([]);
    const [url] = useState(process.env.REACT_APP_API_ROOM_SERVICES);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${url}/room/${id}`)
            .then((response) => {
                console.log('API Response:', response.data);
                setServices(response.data || []); // fallback nếu response trống
            })
            .catch((err) => {
                console.error('API Error:', err.response || err.message);
                setError(err.response?.data?.message || err.message);
            });
    }, [id]);

    const handleDeleteService = (id) => {
        // Xử lý xóa dịch vụ tại đây
        axios
            .delete(`${url}/${id}`)
            .then(() => {
                // Cập nhật lại danh sách dịch vụ sau khi xóa
                setServices((prevServices) => prevServices.filter((service) => service.id !== id));
                alert('Dịch vụ đã được xóa thành công!');
            })
            .catch((error) => {
                console.error('Có lỗi khi xóa dịch vụ:', error);
                alert('Đã xảy ra lỗi khi xóa dịch vụ.');
            });
    };

    const handleEditService = (index) => {};

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className={cx('col-md-12', 'col-sm-12', 'col-xs-12')}>
            <div className={cx('xPanel')}>
                <div className={cx('xTitle')}>
                    <h2>
                        <strong>Danh sách dịch vụ</strong>
                    </h2>
                    <ul className={cx('panelToolbox')}>
                        <li>
                            <Link to={`/admin/service/add/${id}`}>
                                <button className={cx('btn', 'btn-success')}>
                                    <i className="fa fa-plus"></i> Thêm dịch vụ
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('xContent')}>
                    <table className={cx('dataTable')}>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="checkAll" />
                                </th>
                                <th>Hành động</th>
                                <th>Tên</th>
                                <th>Đơn giá (VNĐ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>
                                            <Link to={`/admin/service/edit/${service.id}`}>
                                                <button
                                                    className={cx('btn', 'btn-success')}
                                                    onClick={() => handleEditService(service.id)}
                                                >
                                                    <i className="fa fa-edit" style={{ margin: '5px' }}></i>
                                                </button>
                                            </Link>
                                            <button
                                                className={cx('btn', 'btn-danger')}
                                                onClick={() => handleDeleteService(service.id)}
                                            >
                                                <i className="fa fa-remove" style={{ margin: '5px' }}></i>
                                            </button>
                                        </td>
                                        <td>{service.name}</td>
                                        <td>{service.cost}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ServiceList;
