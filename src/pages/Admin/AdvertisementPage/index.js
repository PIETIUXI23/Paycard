import classNames from 'classnames/bind';
import styles from './AdvertisementPage.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import images from '~/assets/images';
import { getUserId } from '~/utils/auth';
import './pagination.css';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

function AdvertisementPage() {
    const navigate = useNavigate();
    const [advertisements, setAdvertisements] = useState({ pageTotal: 0, pageNum: 0, adData: [] });
    const [newAd, setNewAd] = useState({ title: '', description: '', cost: '', status: 0 });
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [status, setStatus] = useState(1);
    const [url, setUrl] = useState(`${process.env.REACT_APP_API_ADVERTISEMENT_BY_USER}${getUserId()}?status=1`);

    // const handleAdd = () => {
    //     const newAdvertisement = {
    //         ...newAd,
    //         id: advertisements.length + 1,
    //         status: 0,
    //     };
    //     setAdvertisements([...advertisements, newAdvertisement]);
    //     setNewAd({ title: '', description: '', cost: '', status: 0 });
    // };

    const handlePageClick = (event) => {
        // console.log(event.selected);
        // if (url == process.env.REACT_APP_API_ADVERTISEMENT) {
        //     setUrl(`${url}?page=${event.selected}`);
        // } else {
        //     setUrl(`${url}&page=${event.selected}`);
        // }
        setUrl(
            `${process.env.REACT_APP_API_ADVERTISEMENT_BY_USER}${getUserId()}?status=${status}&page=${event.selected}`,
        );
    };

    const handleEdit = (id) => {
        navigate(`/admin/post/update/${id}`);
    };

    const handleDeleteClick = (ad) => {
        setSelectedAd(ad);
        setShowModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_ADVERTISEMENT_DELETE}/${selectedAd}`).then(() => {
            setAdvertisements({
                pageTotal: 0,
                pageNum: 0,
                adData: advertisements.adData.filter((ad) => {
                    return ad.id !== selectedAd;
                }),
            });
            setShowModal(false);
            setSelectedAd(null);
        });
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedAd(null);
    };

    const handleFilter = (status) => {
        setStatus(status);
    };

    useEffect(() => {
        setUrl(`${process.env.REACT_APP_API_ADVERTISEMENT_BY_USER}${getUserId()}?status=${status}`);
    }, [status]);

    useEffect(() => {
        axios.get(`${url}`).then((response) => {
            console.log(response);
            console.log(response.data);

            setAdvertisements(response.data);
        });
    }, [url]);

    return (
        <div className={cx('container')}>
            <h1>Danh sách quảng cáo</h1>

            {/* Filter Buttons */}
            <div className={cx('filter-buttons')}>
                <button
                    onClick={() => {
                        handleFilter(1);
                    }}
                >
                    Quảng cáo hiện tại
                </button>
                <button
                    onClick={() => {
                        handleFilter(0);
                    }}
                >
                    Quảng cáo đang chờ duyệt
                </button>
                <Link to={`/admin/post/add`}>
                    <button className={cx('add-button')}>
                        <span className={cx('icon', 'plus-icon')}></span>
                        Thêm quảng cáo
                    </button>
                </Link>
            </div>

            {/* Advertisement List */}
            <div className={cx('advertisement-list')}>
                {advertisements.adData.map((ad) => (
                    <div key={ad.id} className={cx('advertisement')}>
                        <div className={cx('content')}>
                            <h3>{ad.title}</h3>
                            <p>Địa chỉ: {ad.address}</p>
                            <p>Giá: ${ad.cost}</p>
                            <p>Trạng thái: {ad.status === 1 ? 'Hoạt động' : 'Đang chờ duyệt'}</p>
                        </div>
                        <div className={cx('img-container')}>
                            {ad.images.length > 0 ? (
                                <img className={cx('img')} src={ad.images[0].image_path} />
                            ) : (
                                <img className={cx('img')} src={images.no_photo_available} />
                            )}
                        </div>
                        <div className={cx('actions')}>
                            <button className={cx('update')} onClick={() => handleEdit()}>
                                Edit
                            </button>
                            <button className={cx('delete')} onClick={() => handleDeleteClick(ad.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={advertisements.pageTotal}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeClassName="active"
            />
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <h3>Xác nhận xóa</h3>
                        <p>Bạn có chắc chắn muốn xóa?</p>
                        <div className={cx('modal-actions')}>
                            <button onClick={confirmDelete}>Xóa</button>
                            <button onClick={cancelDelete}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdvertisementPage;
