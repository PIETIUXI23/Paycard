import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getToken, getUserId, getUserSevicePackage } from '~/utils/auth';
import axios from 'axios'; // Dùng axios để gọi API địa chỉ nếu cần
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

function Post() {
    const [formData, setFormData] = useState({
        description: '',
        cost: '',
        title: '',
        area: '',
        latitude: '',
        longitude: '',
        city: '', // Thành phố
        district: '', // Quận/huyện
        ward: '', // Xã/phường
        cityName: '', // Thành phố
        districtName: '', // Quận/huyện
        wardName: '', // Xã/phường
        userId: getUserId(),
        type: getUserSevicePackage() === 3 ? 1 : 2,
        images: [],
    });

    const [locations, setLocations] = useState({
        cities: [],
        districts: [],
        wards: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Nếu thay đổi thành phố, reset các giá trị của huyện và xã
        if (name === 'city') {
            console.log(e.target.options[e.target.selectedIndex].text);

            setFormData({
                ...formData,
                city: value,
                cityName: e.target.options[e.target.selectedIndex].text,
                district: '',
                districtName: '',
                ward: '',
                wardName: '',
            });
            fetchDistricts(value);
        }

        // Nếu thay đổi huyện, reset xã
        if (name === 'district') {
            setFormData({
                ...formData,
                district: value,
                districtName: e.target.options[e.target.selectedIndex].text,
                ward: '',
                wardName: '',
            });
            fetchWards(value);
        }

        if (name === 'ward') {
            setFormData({
                ...formData,
                ward: value,
                wardName: e.target.options[e.target.selectedIndex].text,
            });
        }
    };

    const fetchCities = async () => {
        try {
            // Gọi API lấy danh sách thành phố (ví dụ từ một API địa lý)
            const response = await axios.get(`${process.env.REACT_APP_API_CITY}`);
            setLocations((prev) => ({ ...prev, cities: response.data.data }));
        } catch (error) {
            console.error('Error fetching cities', error);
        }
    };

    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DISTRICT + cityId}.htm`);
            setLocations((prev) => ({ ...prev, districts: response.data.data }));
        } catch (error) {
            console.error('Error fetching districts', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_COMMUNE + districtId}.htm`);
            setLocations((prev) => ({ ...prev, wards: response.data.data }));
        } catch (error) {
            console.error('Error fetching wards', error);
        }
    };

    const handleDescriptionChange = (value) => {
        setFormData({
            ...formData,
            description: value,
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));

        const requestData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'images') {
                formData.images.forEach((image) => requestData.append('images', image));
            } else {
                requestData.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:8080/advertisements/create', requestData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to add advertisement');
            }

            alert('Advertisement added successfully');
            setFormData({
                description: '',
                address: '',
                cost: '',
                title: '',
                area: '',
                latitude: '',
                longitude: '',
                city: '',
                district: '',
                ward: '',
                cityName: '', // Thành phố
                districtName: '', // Quận/huyện
                wardName: '',
                userId: getUserId(),
                type: getUserSevicePackage() === 3 ? 1 : 2,
                images: [],
            });
        } catch (error) {
            console.error(error);
            alert('Error adding advertisement');
        }
    };

    const mapRef = useRef();
    const mapContainerRef = useRef();
    useEffect(() => {
        fetchCities(); // Load cities when component mounts

        mapboxgl.accessToken =
            'pk.eyJ1Ijoia2RxdWFuZzEyMyIsImEiOiJjbTQ3MTM0MmwwMG4yMmtxdDRobmVyOHVmIn0.hrH5j4eH6vKC0J_godgWWQ';
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // container ID
            center: [105.8542, 21.0285], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9, // starting zoom
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        let clickMarker;
        mapRef.current.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            if (clickMarker) {
                clickMarker.setLngLat([lng, lat]);
            } else {
                clickMarker = new mapboxgl.Marker({ color: 'red' }).setLngLat([lng, lat]).addTo(mapRef.current);
            }
            console.log(lng);
            console.log(lat);

            setFormData((prevData) => ({
                ...prevData,
                latitude: lat,
                longitude: lng,
            }));
        });

        return () => {
            mapRef.current.remove();
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}>Đăng quảng cáo</h2>

                <label className={cx('label')}>Tiêu đề:</label>
                <input
                    className={cx('input')}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label className={cx('label')}>Mô tả:</label>
                <ReactQuill className={cx('quill')} value={formData.description} onChange={handleDescriptionChange} />
                <label className={cx('label')}>Địa chỉ:</label>
                <div className={cx('address-selection')}>
                    <select name="city" value={formData.city} onChange={handleChange}>
                        <option value="">Chọn tỉnh, thành phố</option>
                        {locations.cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.city}>
                        <option value="">Chọn quận, huyện</option>
                        {locations.districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>

                    <select name="ward" value={formData.ward} onChange={handleChange} disabled={!formData.district}>
                        <option value="">Chọn xã</option>
                        {locations.wards.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                </div>

                <label className={cx('label')}>Giá:</label>
                <input
                    className={cx('input')}
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                />

                <label className={cx('label')}>Diện tích:</label>
                <input
                    className={cx('input')}
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                />

                <label className={cx('label')}>Chọn vị trí trên bản đồ:</label>
                <div ref={mapContainerRef} className={cx('map-container')}></div>

                <label className={cx('label')}>Ảnh:</label>
                <input
                    className={cx('input')}
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                />

                <button className={cx('submit-btn')} type="submit">
                    Đăng bài
                </button>
            </form>
        </div>
    );
}

export default Post;
