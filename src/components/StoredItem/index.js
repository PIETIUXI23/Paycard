import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StoredItem.module.scss';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function StoredItem({ data, onClick }) {
    const [isVisible, setIsVisible] = useState(true);
    const handleDelete = () => {
        setIsVisible(false);
        let favoritedItems = JSON.parse(localStorage.getItem('favoritedItems'));
        let newFavoritedItems = favoritedItems.filter((item) => {
            return item.id !== data.id;
        });
        localStorage.setItem('favoritedItems', JSON.stringify(newFavoritedItems));
        onClick();
    };
    return (
        isVisible && (
            <div className={cx('wrapper')}>
                <div className={cx('image')}>
                    <img src={data.image} />
                </div>
                <div className={cx('title')}>{data.title}</div>
                <button className={cx('delete-btn')} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        )
    );
}

export default StoredItem;
