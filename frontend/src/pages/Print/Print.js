import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from 'react';
import './Print.css';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Buttons from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';


import CountDownTimer from '../../components/CountdownTimer/CountdownTimer';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import SearchBox from "../../components/Search/Search";

function Print() {

    const targetDate = Date.now() + 15 * 60 * 1000;

    const [selectedFile, setSelectedFile] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [choosePrinter, setChoosePrinter] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessModal1, setShowSuccessModal1] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [showErrorModalBuy, setShowErrorModalBuy] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState('upload');
    const setDefaultCount = "All"
    const [printConfig, setPrintConfig] = useState({
        pageSize: 4,
        duplex: 1,
        copyCount: 1,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [printer, setPrinter] = useState([]);
    const [showSuccessModal2, setShowSuccessModal2] = useState(false);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedPrinterId, setSelectedPrinterId] = useState(null);

    const [errorStatusPrinter, setErrorStatusPrinter] = useState(false);

    const handleChoosePrinter = async (id, status) => {
        // Set the selected printer id
        setSelectedPrinterId(id);
        const PrinterToChoose = printer.find((print) => print._id === id);

        if (PrinterToChoose && PrinterToChoose.location) {
            const dataJson = {
                CampusLocation: PrinterToChoose.location.CampusLocation,
                BuildingLocation: PrinterToChoose.location.BuildingLocation,
                RoomLocation: PrinterToChoose.location.RoomLocation,

            };
            setChoosePrinter(dataJson);

            // Show the confirmation modal
            if (status === 'Error') {
                setErrorStatusPrinter(true);
            }
            else {
                setShowConfirmationModal(true);
            }

        };
    };
    const handleCloseConfirmationModal = () => {
        // Close the confirmation modal
        setShowConfirmationModal(false);
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleSearch = (keyword) => {
        setCurrentPage(1); // Reset trang về 1 khi bắt đầu tìm kiếm mới
        const searchString = keyword.toString().toLowerCase();
        setSearchKeyword(searchString);
    };

    const filteredPrinters = printer.filter((printer) => {
        const mainInfoMatch = Object.values(printer).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        const locationMatch = Object.values(printer.location).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        const locationString = `${printer.location.BuildingLocation}_${printer.location.RoomLocation}`;
        const locationMatch1 = typeof locationString === 'string' && locationString.toLowerCase().includes(searchKeyword.toLowerCase());
        return mainInfoMatch || locationMatch || locationMatch1;
        // return mainInfoMatch;
    }
    );
    const totalFilteredResults = filteredPrinters.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(totalFilteredResults / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const displayedPrinters = filteredPrinters.slice(startIndex, endIndex);

    const handleConfirmChoosePrinter = async (id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            // console.log(accessToken);
            if (accessToken) {

                const PrinterToChoose = printer.find((print) => print._id === id);

                if (PrinterToChoose && PrinterToChoose.location) {
                    const dataJson = {
                        CampusLocation: PrinterToChoose.location.CampusLocation,
                        BuildingLocation: PrinterToChoose.location.BuildingLocation,
                        RoomLocation: PrinterToChoose.location.RoomLocation,

                    };
                    // console.log("Data printer:", dataJson);

                    await axios.post(
                        'http://localhost:8001/printing-setup/set-printer',
                        dataJson,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${accessToken}`,
                            },

                            withCredentials: true,
                        }
                    );

                    // console.log('Response from API:', responseApi.data);
                    setShowSuccessModal2(true);
                }
            }
        } catch (error) {
            // console.error('Error:', error);
            setErrorMessage('Choose Printer failed. Please try again.'); // Set an appropriate error message
            setShowErrorModal(true);
        } finally {
            // Close the confirmation modal regardless of success or failure
            setShowConfirmationModal(false);
        }
    };
    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            alert('Please select a valid PDF file.');
        }
    };

    const handlePrintConfigChange = (field, value) => {
        setPrintConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };



    const handleUpload = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            // console.log(accessToken);
            if (accessToken) {

                // console.log("Test File", selectedFile)

                const formData = new FormData();
                formData.append('file', selectedFile);
                // console.log("Data Test:", [...formData]);
                await axios.post(
                    'http://localhost:8001/printing-setup/upload',
                    formData,
                    {

                        headers: {
                            'Content-Type': 'multipart/form-data', // Đặt loại nội dung là multipart/form-data
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    }
                );



                // console.log('Response from API:', responseApi.data);

                // If file is uploaded successfully, reset countdown timer
                if (sessionStorage.getItem('countdownTargetDate')) {
                    sessionStorage.removeItem('countdownTargetDate');
                }
                setShowSuccessModal(true);
            }
        } catch (error) {
            // console.error('Error:', error);
            setErrorMessage('File upload failed. Please try again.'); // Set an appropriate error message
            setShowErrorModal(true);
        }
    };
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);

    };

    const handleSetupConfig = async () => {
        try {
            // Gửi selectedFile lên API1
            const accessToken = localStorage.getItem('accessToken');
            // console.log(accessToken);
            if (accessToken) {
                // console.log("Test config", printConfig.pageSize)
                const configData = {
                    PaperSize: printConfig.pageSize,
                    IsTwoSide: Boolean(printConfig.duplex),
                    NumberCopy: printConfig.copyCount,
                };
                // console.log("Data", configData);
                const responseApi = await axios.post('http://localhost:8001/printing-setup/setup-config',
                    configData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });

                // console.log('Response from API:', responseApi.data);
                setConfirm(responseApi.data);
                setShowSuccessModal1(true);
            }
        } catch (error) {
            // console.error('Error:', error.response.data.message);
            if (error.response.data.message === "Not enough page!") {
                setShowErrorModalBuy(true)
                setErrorMessage('Không đủ giấy, bạn có muốn mua thêm không?');
            } else {
                setShowErrorModal(true);
                setErrorMessage('Config setup failed. Please try again.');
            }

        }
    };
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get('http://localhost:8001/printing-setup/get-list-printer', {
                headers: {

                    Authorization: `Bearer ${accessToken}`,

                },
                withCredentials: true,
            })
                .then((response) => {
                    // console.log('List Printer:', response.data);
                    setPrinter(response.data);

                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }

    }, []);

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
        setShowErrorModalBuy(false);
        if (errorStatusPrinter) {
            setActiveTab('printer');
        }
        else {
            setActiveTab('upload');
        }
        setErrorStatusPrinter(false);
    };

    const handleCloseModalUpload = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
        setActiveTab('config');
    };
    const handleCloseModalSetup = () => {
        setShowSuccessModal1(false);
        setShowErrorModal(false);
        setActiveTab('printer');
    };
    const handleCloseSuccessModal2 = () => {
        setShowSuccessModal2(false);

    };
    return (

        <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            id="Print"
            className="mb-3"
            justify
        >
            <Tab eventKey="upload" title="Upload File">
                <Container className="mt-5">
                    <Row className="mb-3">
                        <Col xs={6}></Col>
                        <Col xs={12} sm={6}>
                            <h2 className="mb-4" style={{ textAlign: 'left' }}   >Tải file lên hệ thống</h2>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6} style={{ border: '1px solid', borderRadius: '10px' }}>
                            {/* PDF Preview container */}
                            {selectedFile ? (
                                <iframe
                                    title="PDF Preview"
                                    src={URL.createObjectURL(selectedFile)}
                                    width="100%"
                                    height="600px"
                                    border='1px solid black'
                                />
                            ) : (
                                <div className='uploadFrame'>
                                    <div
                                        className="file-input-container"
                                    >
                                    </div>
                                </div>
                            )}
                        </Col>
                        <Col xs={6}>
                            <Row className='mb-5' style={{ display: 'flex' }}>
                                <Col xs={9}>
                                    <Form.Control style={{ marginLeft: '20px', width: '100%', }} type="file" accept=".pdf" onChange={handleFileChange} />
                                </Col>
                                <Col xs={3}><Buttons variant="primary" onClick={handleUpload}>
                                    Upload File
                                </Buttons></Col>
                            </Row>
                            <Row >
                                <Col xs={12} style={{ marginTop: '50px' }} >
                                    {selectedFile && (
                                        <Row>
                                            <Col xs={12} md={12} >
                                                <h2 className="mb-4" style={{ marginLeft: '30px', textAlign: 'left' }}> File in:</h2>
                                                <p className='file'>{selectedFile.name}</p>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                            <Col xs={2} style={{ textAlign: 'left' }}>
                            </Col>
                        </Col>



                    </Row>
                    <Row style={{ height: '20px' }}>
                    </Row>
                    <Row>
                        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                            <Modal.Header className='modal-header'>
                                <Modal.Title>Successful!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>File Uploaded Successfully: {selectedFile?.name}</p>
                                <p>Nhấn OK để tiến hành thiết lập thông số in</p>

                            </Modal.Body>
                            <Modal.Footer>
                                <Buttons variant="secondary" onClick={handleCloseModalUpload}>
                                    OK
                                </Buttons>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showErrorModal} onHide={handleCloseModal}>
                            <Modal.Header className='modal-header-error'>
                                <Modal.Title>Error!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errorMessage}</Modal.Body>
                            <Modal.Footer>
                                <Buttons variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Buttons>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container>
            </Tab>



            <Tab eventKey="config" title="Setup Config">
                <Container>
                    <Row>
                        <Col xs={11}></Col>
                        <Col xs={1}>  {activeTab === 'config' && <CountDownTimer targetDate={targetDate} />}</Col>

                    </Row>
                    <Row className="mb-3 mt-5">
                        <Col xs={5}> </Col>
                        <Col xs={2} style={{ textAlign: 'left' }}></Col>
                        <Col style={{ textAlign: 'left' }} >  <h2 className="mb-4"   >Thông số in </h2> </Col>
                        <Col xs={2}>
                            {/* Upload button */}
                            <Buttons variant="primary" onClick={handleSetupConfig}>
                                Setup Config
                            </Buttons>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={6} style={{ border: '1px solid', borderRadius: '10px' }}>
                            {/* PDF Preview container */}
                            {selectedFile &&
                                <iframe
                                    title="PDF Preview"
                                    src={URL.createObjectURL(selectedFile)}
                                    width="100%"
                                    height="600px"
                                    border='1px solid black'
                                />
                            }
                        </Col>
                        <Col xs={1}></Col>

                        <Col xs={5} className='printconfig'>
                            {/* <div className='printconfig'> */}
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="pageSize" style={{ marginTop: '10px' }}>
                                        <Form.Label>Kích thước trang: A?</Form.Label>
                                        <Form.Control
                                            // type="number"
                                            as="select"
                                            className="text-center"
                                            value={printConfig.pageSize}
                                            onChange={(e) => handlePrintConfigChange('pageSize', e.target.value)}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="Count" style={{ marginTop: '10px' }}>
                                        <Form.Label>Số trang in:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="text-center"
                                            readOnly
                                            value={setDefaultCount}

                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="duplex" style={{ marginTop: '10px' }}>
                                        <Form.Label>In hai mặt:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type='boolean'
                                            className="text-center"
                                            value={printConfig.duplex}
                                            onChange={(e) => handlePrintConfigChange('duplex', parseInt(e.target.value))}
                                        >
                                            <option value={1}>Có</option>
                                            <option value={0}>Không</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="copyCount" style={{ marginTop: '10px' }}>
                                        <Form.Label>Số bản sao:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="text-center"
                                            value={printConfig.copyCount}
                                            onChange={(e) => handlePrintConfigChange('copyCount', parseInt(e.target.value))}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '100px' }} >
                                {selectedFile && (
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <h2 className="mb-4 " style={{ textAlign: 'left' }}> File in:</h2>
                                            <span className='file'>{selectedFile.name}</span>
                                        </Col>
                                    </Row>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ height: '20px' }}>

                    </Row>
                    <Row>
                        <Modal show={showSuccessModal1} onHide={handleCloseSuccessModal}>
                            <Modal.Header className='modal-header'>
                                <Modal.Title>Successful!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Configuration Setup Successful</p>
                                <p>Nhấn OK để tiến hành chọn máy in</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Buttons variant="secondary" onClick={handleCloseModalSetup}>
                                    Close
                                </Buttons>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showErrorModal} onHide={handleCloseModal}>
                            <Modal.Header className='modal-header-error'>
                                <Modal.Title>Error!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errorMessage}</Modal.Body>
                            <Modal.Footer>
                                <Buttons variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Buttons>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showErrorModalBuy} onHide={handleCloseModal}>
                            <Modal.Header className='modal-header-error'>
                                <Modal.Title>Error!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errorMessage}</Modal.Body>
                            <Modal.Footer style={{ justifyContent: 'center' }}>
                                <Buttons variant="secondary" color='error' onClick={handleCloseModal} style={{ marginRight: '10px' }} >
                                    Mua thêm giấy
                                </Buttons>
                                <Buttons variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Buttons>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container>
            </Tab>

            <Tab eventKey="printer" title="Choose Printer">
                <Container>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'right' }}>
                            {activeTab === 'printer' && <CountDownTimer targetDate={targetDate} />}</Col>

                    </Row>
                    <Row style={{ marginTop: '30px' }}>
                        <Row>
                            <Col xs={1}></Col>
                            <Col xs={5} style={{ display: "flex" }}>
                                <strong style={{ textAlign: "left", fontSize: "40px", fontWeight: "700" }}>MÁY IN KHẢ DỤNG</strong>
                            </Col>
                            <Col xs={5} style={{ display: "flex", alignItems: 'right' }}>
                                <Col xs={10} style={{
                                    display: 'flex',
                                    justifyContent: 'center', flexDirection: 'column'
                                }} >

                                    <SearchBox style={{ borderRadius: '8px' }} onSearch={handleSearch} />

                                </Col>
                                <Col style={{
                                    display: 'flex',
                                    justifyContent: 'center', flexDirection: 'column'
                                }} xs={2}>
                                    <Button variant="outlined" color="primary" style={{ width: "80px", marginRight: "20px" }}>Search</Button>
                                </Col>
                            </Col>
                            <Col xs={1}></Col>

                        </Row>
                        <Row style={{ width: "102%", marginTop: "30px" }}>
                            <Col xs={1}></Col>
                            <Col xs={10}>
                                <TableContainer component={Paper} style={{ border: "3px solid grey" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow style={{ backgroundColor: '#3C8DBC', textAlign: 'center', padding: '5px' }} >
                                                <TableCell id="text" >Model</TableCell>
                                                {/* <TableCell id="text" >ID</TableCell> */}
                                                <TableCell id="text" >CƠ SỞ</TableCell>
                                                <TableCell id="text" > VỊ TRÍ</TableCell>
                                                <TableCell id="text" >TÌNH TRẠNG</TableCell>
                                                <TableCell id="text" >Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {displayedPrinters.map((printer) => (
                                                <TableRow key={printer._id}>
                                                    <TableCell id="text_list">{printer.PrinterModel}</TableCell>
                                                    <TableCell id="text_list">{printer.location.CampusLocation}</TableCell>
                                                    <TableCell id="text_list">{`${printer.location.BuildingLocation}_${printer.location.RoomLocation}`}</TableCell>
                                                    <TableCell id="text_list" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <span className={`status-indicator ${printer.PrinterStatus}`} />
                                                    </TableCell>
                                                    <TableCell id="text_list" align="center" >
                                                        <Button id="text_r" style={{ padding: '2px' }} onClick={() => handleChoosePrinter(printer._id, printer.PrinterStatus)}
                                                        >Chọn</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Col>
                            <Col xs={1} ></Col>

                        </Row>


                    </Row>
                    <Row>
                        <Col xs={12} style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                            <Button
                                variant="outlined"
                                // color="success"
                                style={{ marginRight: "10px" }}
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            {pageNumbers.map((number) => (
                                <Button
                                    key={number}
                                    variant={number === currentPage ? "contained" : "outlined"}
                                    // color="success"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number}
                                </Button>
                            ))}
                            <Button
                                variant="outlined"
                                // color="success"
                                onClick={handleNextPage}
                                disabled={endIndex >= totalFilteredResults}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                        <Modal.Header className='modal-header'>
                            <Modal.Title>Xác nhận</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <p>Bạn muốn gửi file: </p>
                                <p>{selectedFile?.name}</p>
                            </Row>
                            <Row>
                                <p>Với các thông số như:</p>
                            </Row>
                            <Row style={{ display: 'flex' }}>
                                <Col>
                                    <p style={{ textAlign: 'center' }}>Loại giấy: </p>
                                    {confirm?.PaperSize === 0 && <p style={{ textAlign: 'center' }} >A0</p>}
                                    {confirm?.PaperSize === 1 && <p style={{ textAlign: 'center' }} >A1</p>}
                                    {confirm?.PaperSize === 2 && <p style={{ textAlign: 'center' }} >A2</p>}
                                    {confirm?.PaperSize === 3 && <p style={{ textAlign: 'center' }} >A3</p>}
                                    {confirm?.PaperSize === 4 && <p style={{ textAlign: 'center' }} >A4</p>}
                                    {confirm?.PaperSize === 5 && <p style={{ textAlign: 'center' }} >A5</p>}

                                </Col>
                                <Col>
                                    <p style={{ textAlign: 'center' }}> In hai mặt:   </p>
                                    <p style={{ textAlign: 'center' }}> {confirm?.TwoSide === true ? 'Có' : 'Không'}  </p>
                                </Col>
                                <Col>
                                    <p style={{ textAlign: 'center' }}>Số trang in:  </p>
                                    <p style={{ textAlign: 'center' }}>{confirm?.FileNumberOfPage}  </p>
                                </Col>
                                <Col>
                                    <p style={{ textAlign: 'center' }}>Số bản sao:  </p>
                                    <p style={{ textAlign: 'center' }}> {confirm?.CopyNum} </p>
                                </Col>
                            </Row>

                            <p>Tại máy in có địa chỉ: {choosePrinter?.CampusLocation} {choosePrinter?.BuildingLocation} {choosePrinter?.RoomLocation} </p>


                        </Modal.Body>
                        <Modal.Footer>
                            <Buttons variant="secondary" onClick={handleCloseConfirmationModal}>
                                Hủy bỏ
                            </Buttons>
                            <Buttons variant="primary" onClick={() => handleConfirmChoosePrinter(selectedPrinterId)}>
                                Xác nhận
                            </Buttons>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSuccessModal2} onHide={handleCloseSuccessModal2}>
                        <Modal.Header className='modal-header'>
                            <Modal.Title>Successful!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Gửi file in thành công</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to='/' >
                                <Buttons variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Buttons>
                            </Link>
                        </Modal.Footer>

                    </Modal>

                    <Modal show={errorStatusPrinter} onHide={handleCloseModal}>
                        <Modal.Header className='modal-header-error'>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Máy in đang bảo trì</p>
                            <p>Vui lòng chọn máy in khác</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Buttons variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Buttons>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showErrorModal} onHide={handleCloseModal}>
                        <Modal.Header className='modal-header-error'>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{errorMessage}</Modal.Body>
                        <Modal.Footer>
                            <Buttons variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Buttons>
                        </Modal.Footer>
                    </Modal>


                </Container>
            </Tab>

        </Tabs>
    );
}

export default Print;