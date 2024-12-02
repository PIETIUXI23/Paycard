import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [url, setUrl] = useState(process.env.REACT_APP_API_USERS);

    useEffect(() => {
        fetchUsers();
    }, [url]);

    const fetchUsers = () => {
        axios
            .get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the users!', error);
            });
    };

    const handleLockUnlock = (id, status) => {
        axios
            .put(
                `http://localhost:8080/users/change-status/${id}`,
                { status: status == 1 ? 0 : 1 },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                setUsers(users.map((user) => (user.id === id ? { ...user, status: !status } : user)));
            })
            .catch((error) => {
                console.error('There was an error updating the user status!', error);
            });
    };

    const filteredUsers = users.filter((user) => {
        return (
            (user.username && user.username.toLowerCase().includes(filter.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(filter.toLowerCase())) ||
            (user.phoneNumber && user.phoneNumber.includes(filter))
        );
    });

    return (
        <div className={cx('container')}>
            <h1>Quản lý người dùng</h1>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên đăng nhập, email, hoặc số điện thoại"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cx('searchInput')}
            />
            <button onClick={() => setFilter(search)} className={cx('filterButton')}>
                Tìm kiếm
            </button>
            <table className={cx('userTable')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên đầy đủ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Tên đăng nhập</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.username}</td>
                            <td>{user.status ? 'Kích hoạt' : 'Khóa'}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-info btn-xs"
                                    onClick={() => handleLockUnlock(user.id, user.status)}
                                >
                                    {user.status === 1 ? 'Khóa' : 'Mở khóa'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
