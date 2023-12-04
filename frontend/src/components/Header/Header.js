
import { Link } from 'react-router-dom';
import './Header.css';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
// import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { connect } from 'react-redux';
import { logout } from '../Store/action';
import Notifications from '../Notification/Notification';
const Header = ({ showHeader, isLoggedIn, setIsLoggedIn }) => {
    // const Header = ({ showHeader, setShowHeader, isLoggedIn, setIsLoggedIn }) => {


    const logoBK = require('./../../assets/Image/logoBK.png');

    const [profile, setProfile] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const dispatch = useDispatch();

    // console.log("Tests:", isLoggedIn)
    useEffect(() => {
        if (isLoggedIn) {
            const accessToken = localStorage.getItem('accessToken');
            console.log("Access token:", accessToken);
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
        localStorage.setItem('accessToken', '');

        // When user logged out the system, clear countdownTargetDate stored in the session
        if (sessionStorage.getItem('countdownTargetDate')) {
            sessionStorage.removeItem('countdownTargetDate');
        }
        dispatch(logout());
    };

    if (!showHeader) {
        dispatch({ type: 'HIDE_HEADER' });
        return null; // hoặc hiển thị một header khác hoặc không hiển thị gì cả
    }





    const handleNotificationClick = () => {
        setShowNotificationModal(true);
    };

    const handleNotificationModalClose = () => {
        setShowNotificationModal(false);
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
                        <Link to={isLoggedIn ? '/print' : '/login'}  >
                            <button className='print'>
                                Thực hiện in
                            </button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to={isLoggedIn ? '/' : '/login'} >
                            <button className='styles'
                            >Mua thêm giấy</button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to={isLoggedIn ? '/history' : '/login'} >
                            <button className='styles'
                            >Xem lịch sử</button>
                        </Link>
                    </Col>
                    <Col xs={2} className='lg' >
                        <Link to={isLoggedIn === false && '/login'} >
                            <button className='styles' onClick={handleNotificationClick}
                            >Thông báo</button>
                        </Link>
                    </Col>

                    <Col xs={2} className='lg'>
                        {profile ? (
                            // User is logged in, display name and logout button
                            <div className='styles' style={{ display: 'flex' }}>
                                <div style={{ marginRight: '20px', color: 'black', fontWeight: 'bold', }}>
                                    {profile.FullName}</div>
                                <Link to='/' onClick={handleLogout} > Logout
                                </Link>

                            </div>

                        ) : (
                            // User is not logged in, display login button
                            <Link to='/login'>
                                <button onClick={() => {
                                    // setShowHeader(false)
                                    localStorage.setItem('showHeader', 'false')
                                }} className="login site-title" style={{ border: 'none', textDecoration: 'none' }}>
                                    Đăng nhập
                                </button>
                            </Link>
                        )}
                    </Col>

                </Row>
            </Container>
            <Modal show={showNotificationModal} onHide={handleNotificationModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Notifications />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNotificationModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}


const mapStateToProps = (state) => ({
    showHeader: state.showHeader,
});

export default connect(mapStateToProps)(Header);