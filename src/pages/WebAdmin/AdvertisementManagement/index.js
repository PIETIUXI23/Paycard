import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';
import styles from './AdvertisementManagement.module.scss';
import { getToken } from '~/utils/auth';

const cx = classNames.bind(styles);

const AdvertisementManagement = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const [dataPage, setDataPage] = useState({ pageTotal: 0, pageNum: 0, adData: [] });
    const [url, setUrl] = useState(process.env.REACT_APP_API_ADMIN_ADVERTISEMENT);
    const [page, setPage] = useState(0);
    const handlePageClick = (event) => {
        // console.log(event.selected);
        // if (url == process.env.REACT_APP_API_ADVERTISEMENT) {
        //     setUrl(`${url}?page=${event.selected}`);
        // } else {
        //     setUrl(`${url}&page=${event.selected}`);
        // }
        setUrl(`${process.env.REACT_APP_API_ADMIN_ADVERTISEMENT}?page=${event.selected}`);
    };

    useEffect(() => {
        fetchAds();
    }, [url]);

    const fetchAds = () => {
        axios
            .get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data); // Kiểm tra dữ liệu trả về từ API
                setDataPage(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the ads!', error);
            });
    };

    const handleApprove = (id) => {
        axios
            .put(
                `http://localhost:8080/advertisements/approve/${id}`,
                {
                    // Chỉ cập nhật trường status
                    status: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                setDataPage((prevState) => ({
                    ...prevState,
                    adData: prevState.adData.map((ad) => (ad.id === id ? { ...ad, status: 1 } : ad)),
                }));
                setSelectedAd(null);
                fetchAds();
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi duyệt quảng cáo!', error);
            });
    };

    return (
        <div className={cx('container')}>
            <h1>Quản lý quảng cáo</h1>
            <table className={cx('adTable')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Người đăng</th>
                        <th>Số điện thoại</th>
                        <th>Loại quảng cáo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPage.adData.map((ad) => (
                        <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td>{ad.title}</td>
                            <td>{ad.fullName}</td>
                            <td>{ad.phoneNumber}</td>
                            <td>{ad.type}</td>
                            <td>
                                <button type="button" className="btn btn-info btn-xs" onClick={() => setSelectedAd(ad)}>
                                    <i className="fa-solid fa-circle-info"></i>
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={dataPage.pageTotal}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeClassName="active"
            />

            {selectedAd && (
                <div className={cx('adDetail')}>
                    <h2>Chi tiết quảng cáo</h2>
                    <p>
                        <strong>ID:</strong> {selectedAd.id}
                    </p>
                    <p>
                        <strong>Tiêu đề:</strong> {selectedAd.title}
                    </p>
                    <p>
                        <strong>Mô tả:</strong> <div dangerouslySetInnerHTML={{ __html: selectedAd.description }} />
                    </p>
                    <p>
                        <strong>Địa chỉ:</strong> {selectedAd.address}
                    </p>
                    <p>
                        <strong>Giá:</strong> {selectedAd.cost}
                    </p>
                    <p>
                        <strong>Người đăng:</strong> {selectedAd.fullName}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong> {selectedAd.phoneNumber}
                    </p>
                    <button type="button" className="btn btn-info btn-xs" onClick={() => handleApprove(selectedAd.id)}>
                        Duyệt
                    </button>
                    <button type="button" className="btn btn-info btn-xs" onClick={() => setSelectedAd(null)}>
                        Hủy
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdvertisementManagement;
