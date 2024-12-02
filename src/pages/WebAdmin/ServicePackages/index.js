import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ServicePackages.module.scss';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const ServicePackages = () => {
    const [packages, setPackages] = useState([]);
    const [editPackage, setEditPackage] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = () => {
        axios
            .get('http://localhost:8080/service-packages/all', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the packages!', error);
            });
    };

    const handleSave = (pkg) => {
        axios
            .put(`http://localhost:8080/service-packages/${pkg.id}`, pkg, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setPackages(packages.map((p) => (p.id === pkg.id ? pkg : p)));
                setEditPackage(null);
            })
            .catch((error) => {
                console.error('There was an error updating the package!', error);
            });
    };

    return (
        <div className={cx('container')}>
            <h1>Quản lý gói dịch vụ</h1>
            <table className={cx('packageTable')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên gói</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg) => (
                        <tr key={pkg.id}>
                            <td>{pkg.id}</td>
                            <td>
                                {editPackage?.id === pkg.id ? (
                                    <input
                                        type="text"
                                        value={editPackage.name}
                                        onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })}
                                    />
                                ) : (
                                    pkg.name
                                )}
                            </td>
                            <td>
                                {editPackage?.id === pkg.id ? (
                                    <input
                                        type="text"
                                        value={editPackage.description}
                                        onChange={(e) =>
                                            setEditPackage({ ...editPackage, description: e.target.value })
                                        }
                                    />
                                ) : (
                                    pkg.description
                                )}
                            </td>
                            <td>
                                {editPackage?.id === pkg.id ? (
                                    <input
                                        type="number"
                                        value={editPackage.price}
                                        onChange={(e) => setEditPackage({ ...editPackage, price: e.target.value })}
                                    />
                                ) : (
                                    pkg.price
                                )}
                            </td>
                            <td>
                                {editPackage?.id === pkg.id ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-info btn-xs"
                                            onClick={() => handleSave(editPackage)}
                                        >
                                            <i className="fa fa-save"></i>
                                            Lưu
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-info btn-xs"
                                            onClick={() => setEditPackage(null)}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                            Hủy
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-info btn-xs"
                                        onClick={() => setEditPackage(pkg)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Chỉnh sửa
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServicePackages;
