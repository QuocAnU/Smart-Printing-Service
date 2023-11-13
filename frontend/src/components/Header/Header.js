

import { Link } from 'react-router-dom';
import './Header.css';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Header = () => {

    const [convert, setConvert] = useState(true);

    const logoBk = require('../../assets/Image/logoBK.png');

    return (
        <Container>
            <Row>
                <Col xs={2} sm={1}>
                    <Link to="/"   >
                        <button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => { setConvert(true) }}>
                            <Image src={logoBk} alt='' style={{ width: '85px', height: '85px' }} />
                        </button>
                    </Link>
                </Col>
                <Col xs={8} sm={9}>
                    <div>
                        <Row>
                            <Col >
                                <div className='wd'>
                                    <Link to='/print'  >
                                        {convert ? <button className="a site-title " style={{ border: 'none', textDecoration: 'none' }} onClick={() => { setConvert(false) }}>
                                            Chọn máy in
                                        </button> : <button className="login site-title " style={{ border: 'none', textDecoration: 'none' }} onClick={() => { setConvert(false) }}>
                                            Chọn máy in
                                        </button>}
                                        {/* <button className="a site-title " style={{border:'none', textDecoration:'none'}} onClick={() => {setConvert(false)}}>
                              Chọn máy in
                          </button> */}
                                    </Link>
                                </div>
                            </Col>
                            <Col >
                                <div className='wd'>
                                    <Link to='/buy'  >
                                        <button className="a site-title " style={{ border: 'none', textDecoration: 'none' }}
                                        >Mua thêm giấy</button>
                                    </Link>
                                </div>
                            </Col>
                            <Col >
                                <div className='wd'>
                                    <Link to='/history' className='a site-title' >Xem lịch sử</Link>
                                </div>
                            </Col>
                            <Col >
                                <div className='wd'>
                                    <Link to='/feedback' className='a site-title'>Gửi feedback</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={2} className='lg' >
                    <Link to='/login'  >
                        <button className="login site-title " style={{ border: 'none', textDecoration: 'none' }} >
                            Đăng nhập
                        </button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Header
