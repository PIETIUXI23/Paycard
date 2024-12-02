import NormalCard from './NormalCard';
import VipCard from './VipCard';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Card({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/advertisement/${data.id}`}>
                {data.type === 1 ? <VipCard data={data} /> : <NormalCard data={data} />}
            </Link>
        </div>
    );
}

export default Card;
