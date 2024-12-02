import React, { useState } from 'react';
import styles from './Ad.module.scss'; // File CSS cho bố cục
import classNames from 'classnames/bind';
import UserHeader from '../components/UserHeader';

const cx = classNames.bind(styles);

function AdLayout({ children }) {
    const [isLoad, setIsLoad] = useState(false);

    const handleLoad = () => {
        console.log('reload');

        setIsLoad(!isLoad);
    };
    return (
        <div className={cx('container')}>
            <UserHeader onClick={handleLoad} />

            <div className={cx('remain')}>
                {/* Thêm div bao ngoài */}
                <div key={isLoad} className={cx('main-container')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdLayout;
