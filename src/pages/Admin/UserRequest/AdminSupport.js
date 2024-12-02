import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AS.module.scss';

const API_BASE_URL = 'http://localhost:8080';

const AdminSupport = () => {
    const [requests, setRequests] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(5); // Số request trên một trang

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get(`${API_BASE_URL}/support-requests/pending`);
            setRequests(response.data);
        };
        fetchRequests();
    }, []);

    const handleReply = async (id) => {
        try {
            await axios.post(`${API_BASE_URL}/support-requests/${id}/reply`, { reply });
            alert('Đã trả lời yêu cầu!');
            // Lọc request đã trả lời ra khỏi danh sách
            setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
            setReply('');
            setSelectedRequest(null);
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra!');
        }
    };

    // Logic phân trang
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    // Đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(requests.length / requestsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.adminSupportContainer}>
            <h1 className={styles.title}>Hỗ trợ yêu cầu</h1>
            <table className={styles.requestTable}>
                <thead>
                    <tr>
                        <th>Nội dung</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.content}</td>
                            <td>
                                <button className={styles.replyButton} onClick={() => setSelectedRequest(req)}>
                                    Trả lời
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? styles.active : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {selectedRequest && (
                <div className={styles.replyForm}>
                    <h2 className={styles.replyTitle}>Trả lời yêu cầu</h2>
                    <textarea
                        className={styles.replyTextarea}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Nhập nội dung trả lời..."
                    ></textarea>
                    <button className={styles.submitButton} onClick={() => handleReply(selectedRequest.id)}>
                        Gửi
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminSupport;
