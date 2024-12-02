import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '..';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';
import { faEnvelope, faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faClose, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function RegisterForm({ visible, onClick, onRedirect }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [serviceSelected, setServiceSelected] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isContinueRegister, setIsContinueRegister] = useState(false);

    const [validateLog, setValidateLog] = useState('');

    const [servicePackages, setServicePackages] = useState([]);

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     console.log(userName + ' ' + password);
    // };

    const handleContinue = (e) => {
        e.preventDefault();
        if (userName && password && rePassword && fullName && email && phoneNumber) {
            if (password !== rePassword) {
                setValidateLog('Mật khẩu và xác nhận mật khẩu không khớp');
                return;
            }
            axios
                .get(`${process.env.REACT_APP_API_BASE_URL}/users/get-by-name?username=${userName}`)
                .then((response) => {
                    if (response.status === 200) {
                        setValidateLog('Người dùng đã tồn tại!');
                    }
                })
                .catch((response) => {
                    setIsContinueRegister(true);
                    setValidateLog('');
                });
        } else {
            setValidateLog('Vui lòng điền đầy đủ thông tin');
        }
    };

    const handleSelect = (service) => {
        console.log(service);
        setServiceSelected(service);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setIsContinueRegister(false);
    };

    const handlePay = (e) => {
        e.preventDefault();
        // setLoading(true);

        axios
            .post('http://localhost:8080/payment/create_payment', {
                username: userName,
                password: password,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                price: serviceSelected.price,
                idService: serviceSelected.id,
            })
            .then((response) => {
                console.log(response.data.url);
                window.location.href = response.data.url;
            });
    };

    useEffect(() => {
        console.log(process.env.REACT_APP_API_SERVICE_PACKAGE);

        axios.get(`${process.env.REACT_APP_API_SERVICE_PACKAGE}`).then((response) => {
            setServicePackages(response.data);
        });
    }, []);
    return isContinueRegister ? (
        <Modal visible={visible} onClick={onClick}>
            <div
                className={cx('register-form')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form>
                    <div>
                        <button onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button onClick={onClick}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                    <div>Mời bạn chọn gói dịch vụ</div>
                    <div className={cx('container')}>
                        {servicePackages.map((service, index) => {
                            return (
                                <div key={index} className={cx('card')}>
                                    <input type="radio" id={`card${index}`} name="service" value={service.id} />
                                    <label
                                        for={`card${index}`}
                                        onClick={() => {
                                            handleSelect(service);
                                        }}
                                    >
                                        <div className={cx('name')}>{service.name}</div>
                                        <div className={cx('price')}>{service.price} đ/tháng</div>
                                        <div className={cx('description')}>{service.description}</div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('error-log')}>{validateLog}</div>
                    <div className={cx('input-group')}>
                        <button onClick={handlePay}>Thanh toán</button>
                    </div>
                </form>
                <div className={cx('redirect')}>
                    Đã có tài khoản? <span onClick={onRedirect}>Đăng nhập tại đây</span>
                </div>
            </div>
        </Modal>
    ) : (
        <Modal visible={visible} onClick={onClick}>
            <div
                className={cx('register-form')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form>
                    <div style={{ justifyContent: 'right' }}>
                        <button onClick={onClick}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                    <div>Xin chào bạn</div>
                    <div>Đăng ký tài khoản mới</div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                            className={cx('username')}
                            placeholder="Tên đăng nhập"
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            value={userName}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            className={cx('password')}
                            placeholder="Mật khẩu"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type={isShowPassword ? 'text' : 'password'}
                            value={password}
                        />
                        <div className={cx('show-password')}>
                            <FontAwesomeIcon
                                className={cx('btn-show', { action: isShowPassword })}
                                icon={faEye}
                                onMouseUp={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                            />
                        </div>
                        <div className={cx('show-password')}>
                            <FontAwesomeIcon
                                className={cx('btn-show', { action: !isShowPassword })}
                                icon={faEyeSlash}
                                onMouseDown={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            className={cx('re-password')}
                            placeholder="Nhập lại mật khẩu"
                            onChange={(e) => {
                                setRePassword(e.target.value);
                            }}
                            type={isShowPassword ? 'text' : 'password'}
                            value={rePassword}
                        />
                        <div className={cx('show-password')}>
                            <FontAwesomeIcon
                                className={cx('btn-show', { action: isShowPassword })}
                                icon={faEye}
                                onMouseUp={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                            />
                        </div>
                        <div className={cx('show-password')}>
                            <FontAwesomeIcon
                                className={cx('btn-show', { action: !isShowPassword })}
                                icon={faEyeSlash}
                                onMouseDown={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input
                            className={cx('full-name')}
                            placeholder="Họ tên"
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                            value={fullName}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input
                            className={cx('email')}
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <input
                            className={cx('phone-number')}
                            placeholder="Số điện thoại"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                            value={phoneNumber}
                        />
                    </div>
                    <div className={cx('error-log')}>{validateLog}</div>
                    <div className={cx('input-group')}>
                        <button onClick={handleContinue}>Tiếp tục</button>
                    </div>
                </form>
                <div className={cx('redirect')}>
                    Đã có tài khoản? <span onClick={onRedirect}>Đăng nhập tại đây</span>
                </div>
            </div>
        </Modal>
    );
}

export default RegisterForm;
