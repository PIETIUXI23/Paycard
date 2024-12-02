import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Support.module.scss';

const cx = classNames.bind(styles);

const Support = () => {
    const [supports, setSupports] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchSupports();
        fetchUsers();
    }, []);

    const fetchSupports = () => {
        axios
            .get('http://localhost:8080/support-requests/all')
            .then((response) => {
                setSupports(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the supports!', error);
            });
    };

    const fetchUsers = () => {
        axios
            .get('http://localhost:8080/users/all')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the users!', error);
            });
    };

    const handleComplete = (id) => {
        axios
            .delete(`http://localhost:8080/support-requests/${id}`)
            .then((response) => {
                setSupports(supports.filter((support) => support.id !== id));
            })
            .catch((error) => {
                console.error('There was an error completing the support!', error);
            });
    };

    const filteredSupports = supports.filter((support) => {
        return support.user.username.toLowerCase().includes(filter.toLowerCase());
    });

    const getUserInfo = (username) => {
        const user = users.find((user) => user.username === username);
        return user ? `${user.email}, ${user.phoneNumber}` : 'No information available';
    };

    return (
        <div className={cx('container')}>
            <h1>Quản lý hỗ trợ</h1>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên đăng nhập"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cx('searchInput')}
            />
            <button onClick={() => setFilter(search)} className={cx('filterButton')}>
                Tìm kiếm
            </button>
            <table className={cx('supportTable')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Nội dung yêu cầu</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSupports.map((support) => (
                        <tr key={support.id}>
                            <td>{support.id}</td>
                            <td>{support.user.username}</td>
                            <td>{support.content}</td>
                            <td>{support.status === 1 ? 'Đang xử lý' : 'Chưa xử lý'}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-info btn-xs"
                                    onClick={() => handleComplete(support.id)}
                                >
                                    Hoàn thành
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('userInfo')}>
                {filter && (
                    <>
                        <h2>Thông tin người dùng</h2>
                        <p>{getUserInfo(filter)}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Support;
