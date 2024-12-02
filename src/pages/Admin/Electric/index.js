import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from 'src/utils/auth'; // Import hàm getUserId()

function Electric() {
    const [userId, setUserId] = useState(null); // Lưu userId của người dùng hiện tại
    const [houses, setHouses] = useState([]); // Danh sách houses
    const [selectedHouse, setSelectedHouse] = useState(null); // House được chọn
    const [rooms, setRooms] = useState([]); // Danh sách rooms của house được chọn
    const [electricData, setElectricData] = useState([]); // Dữ liệu chỉ số điện của rooms

    const baseUrl = process.env.REACT_APP_BASE_URL; // Base URL từ .env

    // Lấy userId từ JWT token khi component được mount
    useEffect(() => {
        const id = getUserId(); // Lấy userId từ token
        if (id) {
            setUserId(id); // Gán userId vào state
        } else {
            console.error('Không tìm thấy userId trong token!');
        }
    }, []);

    // Lấy danh sách houses của user khi userId thay đổi
    useEffect(() => {
        if (userId) {
            axios.get(`${baseUrl}/houses/user/${userId}`)
                .then(response => setHouses(response.data))
                .catch(error => console.error('Lỗi khi lấy danh sách houses:', error));
        }
    }, [userId, baseUrl]);

    // Xử lý khi chọn một house
    const handleHouseSelect = (houseId) => {
        setSelectedHouse(houseId);

        // Gọi API lấy danh sách rooms của house được chọn
        axios.get(`${baseUrl}/rooms/house/${houseId}`)
            .then(response => {
                const rooms = response.data;
                setRooms(rooms);

                // Lấy dữ liệu chỉ số điện cho từng room
                Promise.all(
                    rooms.map(room =>
                        axios.get(`${baseUrl}/api/electric/room/${room.id}`)
                            .then(res => ({
                                roomId: room.id,
                                roomNumber: room.roomNumber,
                                oldReading: res.data?.oldReading || '', // Lấy chỉ số cũ, mặc định là rỗng nếu không có
                                newReading: res.data?.newReading || '', // Lấy chỉ số mới, mặc định là rỗng nếu không có
                                usage: res.data?.usage || 0 // Tính toán số điện tiêu thụ
                            }))
                            .catch(() => ({
                                roomId: room.id,
                                roomNumber: room.roomNumber,
                                oldReading: '',
                                newReading: '',
                                usage: 0
                            }))
                    )
                ).then(data => setElectricData(data));
            })
            .catch(error => console.error('Lỗi khi lấy danh sách rooms:', error));
    };

    // Xử lý khi người dùng thay đổi input (chỉ số cũ hoặc mới)
    const handleInputChange = (roomId, field, value) => {
        setElectricData(prevData => {
            const updatedData = [...prevData];
            const roomIndex = updatedData.findIndex(data => data.roomId === roomId);

            if (roomIndex !== -1) {
                updatedData[roomIndex][field] = value; // Cập nhật giá trị chỉ số

                // Tự động tính toán số điện tiêu thụ
                const oldReading = parseInt(updatedData[roomIndex].oldReading || '0', 10);
                const newReading = parseInt(updatedData[roomIndex].newReading || '0', 10);

                if (field === 'oldReading' || field === 'newReading') {
                    updatedData[roomIndex].usage = Math.max(newReading - oldReading, 0); // Đảm bảo không âm
                }
            }

            return updatedData;
        });
    };

    // Lưu dữ liệu chỉ số điện cho một room
    const handleSave = (roomId) => {
        const roomData = electricData.find(data => data.roomId === roomId);

        if (!roomData) {
            alert('Không tìm thấy thông tin của phòng!');
            return;
        }

        const oldReading = parseInt(roomData.oldReading || 0, 10);
        const newReading = parseInt(roomData.newReading || 0, 10);

        if (isNaN(oldReading) || isNaN(newReading)) {
            alert('Vui lòng nhập số hợp lệ cho chỉ số cũ và chỉ số mới!');
            return;
        }

        if (newReading < oldReading) {
            alert('Chỉ số mới không được nhỏ hơn chỉ số cũ!');
            return;
        }

        const dataToSend = {
            roomId: roomId,
            oldReading: oldReading,
            newReading: newReading,
            usage: newReading - oldReading,
            monthYear: new Date().toISOString().slice(0, 7)
        };

        // Log dữ liệu gửi đi
        console.log('Dữ liệu gửi:', dataToSend);

        axios.post(`${baseUrl}/api/electric/${roomId}`, dataToSend, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                alert(`Phòng ${roomData.roomNumber}: Lưu thành công!`);
            })
            .catch((error) => {
                console.error('Lỗi khi lưu dữ liệu:', error.response?.data || error.message);
                alert(`Phòng ${roomData.roomNumber}: Lỗi khi lưu dữ liệu!`);
            });
    };
    return (
        <div>
            <h2>Quản lý chỉ số điện</h2>

            {/* Dropdown chọn House */}
            <select onChange={(e) => handleHouseSelect(e.target.value)} defaultValue="">
                <option value="" disabled>Chọn nhà</option>
                {houses.map(house => (
                    <option key={house.id} value={house.id}>{house.name}</option>
                ))}
            </select>

            {/* Hiển thị danh sách Rooms khi đã chọn House */}
            {selectedHouse && (
                <table>
                    <thead>
                        <tr>
                            <th>Phòng</th>
                            <th>Chỉ số cũ</th>
                            <th>Chỉ số mới</th>
                            <th>Số điện tiêu thụ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {electricData.map(room => (
                            <tr key={room.roomId}>
                                <td>{room.roomNumber}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={room.oldReading}
                                        onChange={(e) =>
                                            handleInputChange(room.roomId, 'oldReading', e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={room.newReading}
                                        onChange={(e) =>
                                            handleInputChange(room.roomId, 'newReading', e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </td>
                                <td>{room.usage}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSave(room.roomId)}
                                    >
                                        Lưu
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Electric;