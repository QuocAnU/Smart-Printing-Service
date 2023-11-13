import './Homepage.css'

const HomePage = () => {

    return (
        <div>
            <div className='style slide1'>
                {/* <div>
                    <img src={logoBk} alt='' className='logoBK' />
                    <img src={slide1} alt="" className='container' />
                </div> */}
            </div>

            <div className='style'>
                <div className='container slide2'>
                    <h1 className='title'>BACH KHOA SMARTPRINTING SERVICES</h1>
                    <div>
                        {/* <img src={building} alt='' className='building' />
                        <img src={crowdOfUsers} alt='' className='crowd' />
                        <img src={followers} alt='' className='fl' /> */}
                    </div>
                    <p className='text' style={{ marginTop: '-22px', marginRight: '450px' }}> 2 Cơ sở</p>
                    <p className='text' style={{ marginTop: '-37px', marginLeft: '-20px' }}> 6000+ Sinh viên</p>
                    <p className='text' style={{ marginTop: '-37px', marginLeft: '490px' }}>1234 Người theo dõi</p>
                </div>
            </div>

            <div className='style information'>
                <div style={{ width: '1320px' }}>
                    <div style={{ width: '900px' }} >
                        <div style={{ height: '40px', backgroundColor: '#2162c2' }}>
                            <h1 className='title1'>Thông tin chung</h1>
                        </div>
                        <div className='text1 style'>
                            <p className='p' style={{ margin: '70px 50px 10px 50px' }}>Student Smart Printing Service là dịch vụ in in dành cho sinh viên cho phép bạn in từ xa tới bất kỳ máy in nào bạn chọn.
                                Máy in được đặt ở vị trí thuận tiện tại nhiều địa điểm khác nhau trong khuôn viên trường, bao gồm tất cả các thư viện và tòa nhà trong khuôn viên trường. </p>
                            <p className='p' style={{ margin: '10px 50px 20px 50px' }}>Student Smart Printing Service cho phép sinh viên:</p>
                            <div>
                                {/* <img src={square} alt='' className='square' /> */}
                                <p className='p' style={{ margin: '-28px 0 20px 110px' }}>Gửi lệnh in trực tiếp.</p>
                            </div>
                            <div>
                                {/* <img src={square} alt='' className='square' /> */}
                                <p className='p' style={{ margin: '-28px 0 20px 110px' }}>In miễn phí tối đa 600 trang mỗi học kì. Có thể mua thêm theo nhu cầu.</p>
                            </div>
                            <div>
                                {/* <img src={square} alt='' className='square' /> */}
                                <p className='p' style={{ margin: '-28px 0 20px 110px' }}>Bảo mật và riêng tư. Chỉ có bạn mới có thể in và xem lịch sử của mình.</p>
                            </div>
                            <div>
                                {/* <img src={square} alt='' className='square' /> */}
                                <p className='p' style={{ margin: '-28px 0 20px 110px' }}>Mỗi lệnh in được mặc định là in hai mặt để tiết kiệm giấy</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right' style={{ width: '360px' }} >
                    <div style={{ height: '40px', backgroundColor: '#2162c2' }} >
                        <h1 className='title1'>Thông tin liên hệ</h1>
                    </div>
                    <div className='text1 style'>
                        <div>
                            {/* <img src={gg} alt='' className='gg' /> */}
                            <p className='p' style={{ margin: '-21px 0px 20px 90px' }}>Vị trí văn phòng</p>
                        </div>
                        <div>
                            {/* <img src={square} alt='' className='square' /> */}
                            <p className='p' style={{ margin: '-29px 0px 20px 105px' }}>Cơ sở 1: Lý Trường Kiệt, Q10, Tp.HCM</p>
                        </div>
                        <div>
                            {/* <img src={square} alt='' className='square' /> */}
                            <p className='p' style={{ margin: '-29px 0px 20px 105px' }}>Cơ sở 2: Dĩ An, Bình Dương</p>
                        </div>
                        <div>
                            {/* <img src={call} alt='' className='call' /> */}
                            <p className='p' style={{ margin: '-21px 0px 20px 90px' }}>Liên hệ</p>
                        </div>
                        <div>
                            {/* <img src={square} alt='' className='square' /> */}
                            <p className='p' style={{ margin: '-29px 0px 20px 105px' }}>Email: pdt@hcmut.edu.vn</p>
                        </div>
                        <div>
                            {/* <img src={square} alt='' className='square' /> */}
                            <p className='p' style={{ margin: '-29px 0px 20px 105px' }}>Phone: 0288 345 345</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage