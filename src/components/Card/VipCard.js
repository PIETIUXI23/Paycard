import Button from '~/components/Button';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function VipCard({ data }) {
    const [btnState, setBtnState] = useState(false);
    const defaultImages = [
        { id: 'default1', image_path: images.no_photo_available },
        { id: 'default2', image_path: images.no_photo_available },
        { id: 'default3', image_path: images.no_photo_available },
        { id: 'default4', image_path: images.no_photo_available },
    ];

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
            image: data.images[1] ? data.images[1].image_path : images.no_photo_available,
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
    return (
        <>
            <div className={cx('vip-card-layout')}>
                <div className={cx('image-box')}>
                    {[...data.images, ...defaultImages].slice(0, 4).map((img, index) => {
                        return (
                            <div key={img.id} className={cx(`item${index}`)}>
                                <img src={img.image_path} />
                            </div>
                        );
                    })}
                </div>
                <div className={cx('card-info')}>
                    <div className={cx('card-title')}>{data.title}</div>
                    <div className={cx('card-detail')}>
                        <span className={cx('cost')}>{data.cost} đ/tháng</span>
                        <span className={cx('card-dot')}>·</span>
                        <span className={cx('area')}>{data.area} m²</span>
                        <span className={cx('card-dot')}>·</span>
                        <span className={cx('local')}>{data.address}</span>
                    </div>
                    <div className={cx('card-description')}>{data.description}</div>
                </div>
                <div className={cx('card-contact')}>
                    <div className={cx('user')}>
                        <img className={cx('avatar')} src={images.default_avatar_icon} />
                        <span>
                            <div className={cx('user-name')}>{data.full_name}</div>
                            <div className={cx('create-at')}>{data.create_at}</div>
                        </span>
                    </div>
                    <div className={cx('actions')}>
                        <Button className={cx('phone-number')} leftIcon={<FontAwesomeIcon icon={faPhone} />}>
                            {data.phone_number}
                        </Button>
                        <Button
                            onClick={handleLikeItem}
                            className={cx('favorite-btn', { active: btnState })}
                            outline
                            leftIcon={<FontAwesomeIcon icon={faHeart} />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VipCard;
