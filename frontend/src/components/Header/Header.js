

import { Link } from 'react-router-dom';
import './Header.css';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const logoBK = require('./../../assets/Image/logoBK.png');

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
                        <Link to='/print'  >
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


                    <Col xs={2} className='lg' >
                        <Link to='/login'   >
                            <button onClick={() => setIsLoggedIn(false)} className="login site-title " style={{ border: 'none', textDecoration: 'none' }} >
                                Đăng nhập
                            </button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Header
