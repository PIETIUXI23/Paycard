import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import styles from './EmailHistory.module.scss'; // Import SCSS

const mockNotifications = [
    {
        id: 1,
        recipient: 'locnt@gmail.com',
        title: 'locdz',
        status: 'OK',
        sentTime: '27/11/2024 16:09',
    },
    {
        id: 2,
        recipient: 'loc@gmail.com',
        title: 'tatloc',
        status: 'OK',
        sentTime: '27/11/2024 16:09',
    },
    {
        id: 3,
        recipient: 'thitcho@gmail.com',
        title: 'locnt179',
        status: 'OK',
        sentTime: '27/11/2024 16:09',
    },
    {
        id: 4,
        recipient: 'mamtom9@gmail.com',
        title: 'locnt179',
        status: 'OK',
        sentTime: '27/11/2024 16:09',
    },
    {
        id: 5,
        recipient: 'locnt179@gmail.com',
        title: 'locdz',
        status: 'OK',
        sentTime: '27/11/2024 16:09',
    },
];

const EmailHistory = () => {
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotifications = mockNotifications.filter((notification) =>
        notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Lịch sử gửi email/sms</h2>
                    <button>Email</button>
                </div>

                <div className={styles.filters}>
                    <label>
                        Xem
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        mục
                    </label>
                    <label>
                        Tìm:
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm..."
                        />
                    </label>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Người nhận</th>
                            <th>Tiêu đề</th>
                            <th>Trạng thái</th>
                            <th>Thời gian gửi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNotifications.slice(0, pageSize).map((notification) => (
                            <tr key={notification.id}>
                                <td>
                                    <button>
                                        <Eye size={16} />
                                    </button>
                                </td>
                                <td>{notification.recipient}</td>
                                <td>{notification.title}</td>
                                <td>{notification.status}</td>
                                <td>{notification.sentTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmailHistory;
