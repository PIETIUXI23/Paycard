import axios from 'axios';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import RoomGallery from '~/components/RoomGallery';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShareNodes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '~/components/Popper/Wrapper';
import { Helmet } from 'react-helmet';

// import './styles.css';

const cx = classNames.bind(styles);
const dataFake = {
    id: 1,
    description:
        ' - Giá ngày. + 1PN: 1.3tr/ngày. + 2PN: 1.8tr/ngày. + 3PN: 2.3tr/ngày. - Giá tháng. + Căn hộ 1PN: Giá 13tr/th (65m²). + Căn hộ 2PN: Giá từ 16tr/th (76m², 99m², 106m²). + Căn hộ 3PN: Giá 17tr - 20 tr/th (129m², 138m², 162m²). + Căn hộ 4PN: Giá 25tr - 30 tr/th (162m²). + Căn hộ penthouse: Giá 60 tr/th - 99 tr/th (300 - 1000m²). Nhà được trang bị nội thất đầy đủ, cao cấp, tiện nghi. Hoặc nhà trống, nội thất cơ bản (theo yêu cầu khách hàng).Với đầy đủ ...',
    status: 0,
    address: 'Đại Đồng, Thạch Thất, Hà Nội',
    area: 20,
    cost: 5000000,
    title: 'Cho thuê kho chứa hàng 50m, 100m, 200m, 500m, tại Tp. Hồ Chí Minh, miễn phí quản lý, Bảo vệ 24h',
    max_occupants: 3,
    latitude: 20,
    longitude: 20,
    create_at: '11-09-2024',
    type: 1,
    images: [
        { id: 1, image_path: 'https://file4.batdongsan.com.vn/crop/562x284/2023/04/17/20230417230205-1b13_wm.jpg' },
        { id: 2, image_path: 'https://file4.batdongsan.com.vn/crop/283x141/2023/04/17/20230417230207-a221_wm.jpg' },
        { id: 3, image_path: 'https://file4.batdongsan.com.vn/crop/140x140/2023/04/17/20230417230202-3438_wm.jpg' },
        { id: 4, image_path: 'https://file4.batdongsan.com.vn/crop/140x140/2023/04/17/20230417230210-69b7_wm.jpg' },
        { id: 5, image_path: 'https://file4.batdongsan.com.vn/crop/562x284/2023/04/17/20230417230205-1b13_wm.jpg' },
        { id: 6, image_path: 'https://file4.batdongsan.com.vn/crop/140x140/2023/04/17/20230417230202-3438_wm.jpg' },
        { id: 7, image_path: 'https://file4.batdongsan.com.vn/crop/140x140/2023/04/17/20230417230210-69b7_wm.jpg' },
        { id: 8, image_path: 'https://file4.batdongsan.com.vn/crop/562x284/2023/04/17/20230417230205-1b13_wm.jpg' },
    ],

    full_name: 'Khuất Đinh Quang',
    email: 'kdquang123@gmail.com',
    phone_number: '0911598764',
};

function Detail() {
    const { id } = useParams();
    const [data, setData] = useState(dataFake);

    const roomUrl = `${process.env.REACT_APP_API_ADVERTISEMENT}/${id}`;

    useEffect(() => {
        axios.get(roomUrl).then((response) => {
            setData(response.data);
        });
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const title = data.title;
    const handleToggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setIsDropdownOpen(false);
    };

    const shareOnFacebook = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(roomUrl)}`;
        window.open(facebookShareUrl, '_blank');
    };

    const shareOnZalo = () => {
        const zaloShareUrl = `https://zalo.me/share?url=${encodeURIComponent(roomUrl)}&text=${encodeURIComponent(
            title,
        )}`;
        window.open(zaloShareUrl, '_blank');
    };
    const [btnState, setBtnState] = useState(false);

    useEffect(() => {
        const favoritedItems = JSON.parse(localStorage.getItem('favoritedItems')) || [];
        const isFavorited = !!favoritedItems.find((item) => item.id === data.id);
        setBtnState(isFavorited);
    }, [data.id]);

    const handleLikeItem = (e) => {
        e.preventDefault();
        const favoriteItem = {
            id: data.id,
            title: data.title,
            image: data.images[1].image_path,
        };
        let favoritedItems = JSON.parse(localStorage.getItem('favoritedItems'));

        if (!favoritedItems) {
            localStorage.setItem('favoritedItems', JSON.stringify([favoriteItem]));
        } else {
            let favoritedItem = favoritedItems.find((item) => {
                return item.id === favoriteItem.id;
            });
            if (!favoritedItem) {
                localStorage.setItem('favoritedItems', JSON.stringify([...favoritedItems, favoriteItem]));
            } else {
                let newFavoritedItems = favoritedItems.filter((item) => {
                    return item.id !== favoriteItem.id;
                });
                localStorage.setItem('favoritedItems', JSON.stringify(newFavoritedItems));
            }
        }
        setBtnState(!btnState);
    };

    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(() => {
        console.log(data.latitude, data.longitude);

        mapboxgl.accessToken =
            'pk.eyJ1Ijoia2RxdWFuZzEyMyIsImEiOiJjbTQ3MTM0MmwwMG4yMmtxdDRobmVyOHVmIn0.hrH5j4eH6vKC0J_godgWWQ';
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // container ID
            center: [data.longitude, data.latitude], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9, // starting zoom
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        mapRef.current.on('load', () => {
            //Thêm Marker tại trung tâm
            const marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat([data.longitude, data.latitude]) // Sử dụng tọa độ trung tâm
                .addTo(mapRef.current); // Thêm Marker vào bản đồ
        });
        mapRef.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        return () => {
            mapRef.current.remove();
        };
    }, [data]);
    return (
        <>
            <Helmet>
                <title>{data.title}</title>
                <meta name="description" content={data.description} />
                <meta property="og:title" content={`Chi tiết phòng trọ`} />
                <meta property="og:description" content={data.description} />
                {/* <meta property="og:image" content={data.images[1].image_path} /> */}
                <meta property="og:url" content={`http://localhost:3000/advertisement/${data.id}`} />
            </Helmet>
            <div className={cx('content-wrapper')}>
                <div className={cx('main-content')}>
                    <RoomGallery data={data.images} />
                    <div className={cx('title')}>{data.title}</div>
                    <div className={cx('address')}>{data.address}</div>
                    <div className={cx('short-info')}>
                        <div className={cx('cost')}>
                            <div>Mức giá</div>
                            <div>{data.cost / 1000000} triệu/tháng</div>
                        </div>
                        <div className={cx('area')}>
                            <div>Diện tích</div>
                            <div>{data.area} m²</div>
                        </div>
                        <div className={cx('actions')}>
                            <Tippy
                                zIndex={1000}
                                offset={[0, 0]}
                                interactive={true}
                                visible={isDropdownOpen === true}
                                onClickOutside={handleCloseDropdown}
                                render={(attrs) => {
                                    return (
                                        <div className={cx('share-list')} tabIndex="-1" {...attrs}>
                                            <Wrapper className={cx('share-popper')}>
                                                <div className={cx('popper-body')}>
                                                    <Button onClick={shareOnFacebook}>Facebook</Button>
                                                    <Button onClick={shareOnZalo}>Zalo</Button>
                                                </div>
                                            </Wrapper>
                                        </div>
                                    );
                                }}
                            >
                                <button onClick={handleToggleDropdown}>
                                    {<FontAwesomeIcon icon={faShareNodes} />}
                                </button>
                            </Tippy>
                            <button>{<FontAwesomeIcon icon={faTriangleExclamation} />}</button>
                            <button onClick={handleLikeItem} className={cx('favorite-btn', { active: btnState })}>
                                {<FontAwesomeIcon icon={faHeart} />}
                            </button>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <div>Thông tin mô tả</div>
                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                    <div className={cx('map-box')}>
                        <div>Xem trên bản đồ</div>
                        <div className={cx('map-container')} ref={mapContainerRef} />
                    </div>
                    <div className={cx('short-info', 'config')}>
                        <div className={cx('cost')}>
                            <div>Ngày đăng</div>
                            <div>{data.create_at}</div>
                        </div>
                        <div className={cx('area')}>
                            <div>Loại tin</div>
                            <div>{data.type === 1 ? 'Vip 1' : 'Vip 2'}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('sidebar-box')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('header')}>
                            <img src={images.default_avatar_icon} />
                            <div>{data.full_name}</div>
                        </div>
                        <div className={cx('body')}>
                            <Button
                                className={cx('phone-number', 'contact-info')}
                                leftIcon={<FontAwesomeIcon icon={faPhone} />}
                            >
                                {data.phone_number}
                            </Button>
                            <Button
                                href={`https://zalo.me/${data.phone_number}`}
                                target="_blank"
                                outline
                                className={cx('contact-info')}
                                leftIcon={<img src={images.zalo_logo} />}
                            >
                                Chat qua zalo
                            </Button>
                            <Button
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`}
                                target="_blank"
                                outline
                                className={cx('contact-info')}
                            >
                                Gửi email
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
