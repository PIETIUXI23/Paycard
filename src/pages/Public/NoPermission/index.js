import { Link } from 'react-router-dom';

function NoPermission() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'red' }}>Bạn không có quyền vào trang này!</h1>
            <p>Rất tiếc, bạn không có quyền truy cập vào trang này.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Quay về trang chủ
            </Link>
        </div>
    );
}

export default NoPermission;
