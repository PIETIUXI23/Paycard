import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Modal({ visible, onClick, children }) {
    return (
        visible && (
            <div onClick={onClick} className={cx('wrapper')}>
                {children}
            </div>
        )
    );
}

export default Modal;
