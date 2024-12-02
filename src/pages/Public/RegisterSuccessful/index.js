import { Link } from 'react-router-dom';

function RegisterSuccessful() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'green' }}>Đăng ký thành công!</h1>
            <p>Chúc mừng bạn đã hoàn tất việc đăng ký tài khoản.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Quay về trang chủ
            </Link>
        </div>
    );
}

export default RegisterSuccessful;
