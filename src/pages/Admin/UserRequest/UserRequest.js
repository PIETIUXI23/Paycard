import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUserId } from '~/utils/auth'; // Import hàm lấy userId
import styles from './UR.module.scss'; // Import file SCSS

const UserRequest = () => {
    const [requests, setRequests] = useState([]); // Danh sách yêu cầu
    const [content, setContent] = useState(''); // Nội dung yêu cầu mới
    const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi
    const [statusFilter, setStatusFilter] = useState(1); // Mặc định là tin nhắn "đến" (status = 1)
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(5); // Số lượng tin nhắn mỗi trang
    const userId = getUserId(); // Lấy userId từ thư viện utils/auth.js

    const API_BASE_URL = 'http://localhost:8080'; // Tên miền cơ sở của API

    // Lấy danh sách yêu cầu theo trạng thái
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/support-requests/user/${userId}?status=${statusFilter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type': 'application/json',
                        },
                    },
                );
                setRequests(response.data); // Lưu danh sách yêu cầu vào state
            } catch (error) {
                console.error('Lỗi khi lấy danh sách yêu cầu:', error);
            }
        };
        fetchRequests();
    }, [userId, statusFilter]);

    // Gửi yêu cầu mới
    const handleSubmit = async () => {
        if (!content.trim()) {
            setErrorMessage('Vui lòng nhập nội dung yêu cầu!'); // Hiển thị lỗi nếu nội dung rỗng
            return;
        }

        try {
            const newRequest = {
                content,
                createdAt: new Date(),
                status: 0,
                user: { id: userId },
            };

            const response = await axios.post(`${API_BASE_URL}/support-requests`, newRequest, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            setRequests((prevRequests) => [...prevRequests, response.data]);
            setContent('');
            setErrorMessage('');
            alert('Yêu cầu đã được gửi!');
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            setErrorMessage('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!');
        }
    };

    // Lọc danh sách yêu cầu dựa trên trạng thái và điều kiện adminReply
    const filteredRequests = requests.filter((request) => {
        if (statusFilter === 1) {
            return request.adminReply && request.adminReply.trim() !== '';
        }
        return true;
    });

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Phát sinh yêu cầu hỗ trợ</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung yêu cầu..."
                className={styles.textarea}
            ></textarea>
            <button onClick={handleSubmit} className={styles.button}>
                Gửi yêu cầu
            </button>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            {/* Bộ lọc trạng thái tin nhắn */}
            <div className={styles.filterButtons}>
                <button
                    onClick={() => {
                        setStatusFilter(1);
                        setCurrentPage(1);
                    }}
                    className={`${styles.filterButton} ${statusFilter === 1 ? styles.active : ''}`}
                >
                    Tin nhắn đến
                </button>
                <button
                    onClick={() => {
                        setStatusFilter(0);
                        setCurrentPage(1);
                    }}
                    className={`${styles.filterButton} ${statusFilter === 0 ? styles.active : ''}`}
                >
                    Tin nhắn đi
                </button>
            </div>

            {/* Hiển thị danh sách yêu cầu */}
            <h2 className={styles.title}>{statusFilter === 1 ? 'Danh sách tin nhắn đến' : 'Danh sách tin nhắn đi'}</h2>
            {currentRequests.length === 0 ? (
                <p>Không có yêu cầu nào.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Phản hồi từ Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.content}</td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td>{request.status === 0 ? 'Chưa trả lời' : 'Đã trả lời'}</td>
                                <td>{request.adminReply || 'Chưa có phản hồi'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Điều hướng phân trang */}
            {filteredRequests.length > itemsPerPage && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        Trang trước
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastItem >= filteredRequests.length}
                        className={styles.pageButton}
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserRequest;
