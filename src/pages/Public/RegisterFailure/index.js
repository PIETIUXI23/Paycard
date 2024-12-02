import { Link } from 'react-router-dom';

function RegisterFailure() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'red' }}>Đăng ký thất bại!</h1>
            <p>Rất tiếc, đã có lỗi xảy ra trong quá trình đăng ký.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Thử lại
            </Link>
        </div>
    );
}

export default RegisterFailure;
