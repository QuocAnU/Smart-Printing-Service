

import { Link } from 'react-router-dom';
import './Header.css';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'

const Header = ({ showHeader, setShowHeader, isLoggedIn, setIsLoggedIn }) => {
    const logoBK = require('./../../assets/Image/logoBK.png');

    const [profile, setProfile] = useState(null);
    const [fullname, setFullname] = useState("");

    console.log("Test:", isLoggedIn)
    useEffect(() => {
        if (isLoggedIn) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                axios.get('http://localhost:8001/user/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                })
                    .then((response) => {
                        console.log('User Profile:', response.data);
                        setProfile(response.data);

                    })
                    .catch((error) => {
                        console.error('Error fetching user profile:', error);
                    });
            }
        }
    }, [isLoggedIn]);



    const handleLogout = () => {
        setProfile(null);
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
    };



    return (
        <div className='header'>
            <Container>
                <Row>
                    <Col xs={2} sm={1}>
                        <Link to="/"   >
                            <button style={{ border: 'none', backgroundColor: 'white' }}>
                                <Image src={logoBK} alt='' style={{ width: '85px', height: '85px' }} />
                            </button>
                        </Link>
                    </Col>
                    <Col sx={2} sm={1}></Col>
                    <Col sx={2} className='lg' >
                        <Link to='/prepare'  >
                            <button className='print'>
                                Thực hiện in
                            </button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to='/buy'  >
                            <button className='styles'
                            >Mua thêm giấy</button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to='/'  >
                            <button className='styles'
                            >Xem lịch sử</button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to='/'  >
                            <button className='styles'
                            >Thông báo</button>
                        </Link>
                    </Col>

                    <Col xs={2} className='lg'>
                        {profile ? (
                            // User is logged in, display name and logout button
                            <div className='styles' style={{ display: 'flex' }}>
                                <div style={{ marginRight: '20px' }}>{profile.FullName}</div>
                                <Link to='/' onClick={handleLogout} > Logout
                                </Link>

                            </div>

                        ) : (
                            // User is not logged in, display login button
                            <Link to='/login'>
                                <button onClick={() => setShowHeader(false)} className="login site-title" style={{ border: 'none', textDecoration: 'none' }}>
                                    Đăng nhập
                                </button>
                            </Link>
                        )}
                    </Col>

                </Row>
            </Container>
        </div>

    );
}

export default Header



