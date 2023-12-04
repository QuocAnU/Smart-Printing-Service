import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';
// import CountdownTimer from '../../components/CountdownTimer/CountdownTimer'
import './Homepage.css'

const HomePage = ({ showHeader }) => {
    const slide1 = require('./../../assets/Image/slide1.png')
    const build = require('./../../assets/Image/building.png')
    const crowd = require('./../../assets/Image/crowd-of-users.png')
    const add = require('./../../assets/Image/add.png')
    const square = require('./../../assets/Image/square.png')
    const gg = require('./../../assets/Image/google-maps.png')
    const call = require('./../../assets/Image/call.png')
    const logoBK = require('./../../assets/Image/logoBK.png')

    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('isLoggedIn'))
        if (localStorage.getItem('accessToken') === '') {
            navigate("/");
        }
    }, []);


    return (
        <>
            <Container className='mt-12'>
                <Row xs={12}>
                    <Row>
                        {/* Demo of using time counter UI */}
                        <Container>
                            <img src={logoBK} alt='' className='logoBK' />
                            <img src={slide1} alt="" className='container' />
                        </Container>
                    </Row>
                    <Row>

                        <div className='container slide2'>
                            <h1 className='title'>BACH KHOA SMARTPRINTING SERVICES</h1>
                            <Row>
                                <Col xs={3}></Col>
                                <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={build} alt="" style={{ width: '33px', height: '29px' }}></img>
                                    <p className='text' > 2 Cơ sở</p>
                                </Col >
                                <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={crowd} alt="" style={{ width: '33px', height: '29px' }}></img>
                                    <p className='text' > 6000+ Sinh viên</p>
                                </Col>
                                <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}  >
                                    <img src={add} alt="" style={{ width: '33px', height: '29px' }}></img>
                                    <p className='text' >1234 Người theo dõi</p></Col>

                            </Row>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={7} className='style information'>
                            <div>
                                <div style={{ height: '40px', backgroundColor: '#2162c2' }}>
                                    <h1 className='title1'>Thông tin chung</h1>
                                </div>
                                <div className='text1 style'>

                                    {/* <CountdownTimer targetDate={dateTimeAfterThreeDays} /> */}
                                    <p className='p' style={{ margin: '35px 50px 10px 50px' }}>Student Smart Printing Service là dịch vụ in in dành cho sinh viên cho phép bạn in từ xa tới bất kỳ máy in nào bạn chọn. </p>
                                    <p className='p' style={{ margin: '0 50px 10px' }}>          Máy in được đặt ở vị trí thuận tiện tại nhiều địa điểm khác nhau trong khuôn viên trường, bao gồm tất cả các thư viện và tòa nhà trong khuôn viên trường.</p>
                                    <p className='p' style={{ margin: '10px 50px 0px' }}>Student Smart Printing Service cho phép sinh viên:</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='p' style={{ margin: ' 20px 0px 0px 16px' }}>Gửi lệnh in trực tiếp.</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='p' style={{ margin: ' 20px 0px 0px 16px' }}>In miễn phí tối đa 600 trang mỗi học kì. Có thể mua thêm theo nhu cầu.</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='p' style={{ margin: ' 20px 0px 0px 16px' }}>Bảo mật và riêng tư. Chỉ có bạn mới có thể in và xem lịch sử của mình.</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='p' style={{ margin: ' 20px 0px 0px 16px' }}>Mỗi lệnh in được mặc định là in hai mặt để tiết kiệm giấy.</p>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col xs={1}></Col>
                        <Col xs={4} className='style information'>
                            <div >

                                <div style={{ height: '40px', backgroundColor: '#2162c2' }} >
                                    <h1 className='title1'>Thông tin liên hệ</h1>
                                </div>
                                <div className='text1 style'>
                                    <div style={{ display: 'flex' }}>
                                        <img src={gg} alt='' className='gg' />
                                        <p className='p' style={{ margin: '35px 10px 5px 10px' }}>Vị trí văn phòng</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='pq' style={{ margin: '13px 0px 0px 10px' }}>Cơ sở 1: Lý Trường Kiệt, Q10, Tp.HCM</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='pq' style={{ margin: '13px 0px 0px 10px' }}>Cơ sở 2: Dĩ An, Bình Dương</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <img src={call} alt='' className='call' />
                                        <p className='p' style={{ margin: '20px 10px 5px 10px' }}>Liên hệ</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='pq' style={{ margin: '13px 0px 0px 10px' }}>Email: pdt@hcmut.edu.vn</p>
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                                        <img src={square} alt='' className='square' />
                                        <p className='pq' style={{ margin: '13px 0px 0px 10px' }}>Phone: 0288 345 345</p>
                                    </div>
                                </div>
                            </div>

                        </Col>

                    </Row>
                </Row>
            </Container>
        </>

    )
}
export default HomePage