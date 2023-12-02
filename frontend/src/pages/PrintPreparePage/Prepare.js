import React, { useState, useRef } from 'react';
import './PrintPrepair.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PreparePrint = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const setDefaultCount = "All"
    const [printConfig, setPrintConfig] = useState({
        pageSize: 2,
        duplex: 1,
        copyCount: 1,
    });
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


    const handleFileReset = () => {
        setSelectedFile(null);
    };
    // const handleSelectPrinter = () => {

    // };
    const handleUpload = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            if (accessToken) {

                console.log("Test File", selectedFile)

                const formData = new FormData();
                formData.append('file', selectedFile);
                console.log("Data Test:", ...formData);
                const responseApi = await axios.post(
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



                console.log('Response from API:', responseApi.data);
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);

    };
    const handleSetupConfig = async () => {
        try {
            // Gửi selectedFile lên API1
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            if (accessToken) {
                console.log("Test config", printConfig.pageSize)

                const formData = new FormData();
                formData.append('PageSize', printConfig.pageSize);
                formData.append('IsTwoSide', printConfig.duplex);
                formData.append('NumberCopy', printConfig.copyCount);

                console.log("Data", ...formData);
                const responseApi = await axios.post('http://localhost:8001/printing-setup/setup-config',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });

                console.log('Response from API:', responseApi);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleChooseFile = (e) => {

        // Clear the file input value to allow selecting the same file again
        e.target.value = null;
        e.target.click();

    };


    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col xs={3}>
                    <h2 className="mb-4"   >Tải file lên hệ thống</h2> </Col>

                {selectedFile ? (
                    <Col xs={2} style={{ textAlign: 'right' }}>
                        <Form.Control
                            style={{ width: '53%' }}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </Col>

                ) : (
                    <Col xs={2}>
                    </Col>
                )}
                <Col xs={2} style={{ textAlign: 'left' }}>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload File
                    </Button></Col>
                <Col style={{ textAlign: 'left' }} >  <h2 className="mb-4"   >Thông số in </h2> </Col>
                <Col xs={2} style={{}} >
                    {/* Upload button */}
                    <Button variant="primary" onClick={handleSetupConfig}>
                        Setup Config
                    </Button>
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
                                <Form.Control style={{ marginTop: '300px', marginBottom: '300px', marginLeft: '150px', width: '50%', }} type="file" accept=".pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                    )}
                </Col>
                <Col xs={1}></Col>
                <Col xs={5} className='printconfig'>
                    {/* <div className='printconfig'> */}
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="pageSize" style={{ marginTop: '10px' }}>
                                <Form.Label>Kích thước trang:</Form.Label>
                                <Form.Control
                                    // type="number"
                                    as="select"
                                    className="text-center"
                                    value={printConfig.pageSize}
                                    onChange={(e) => handlePrintConfigChange('pageSize', e.target.value)}
                                >
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
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
                    <Row>
                        <Link to='/listprinter'>
                            <Button variant="primary" >
                                Chọn máy in
                            </Button>
                        </Link>

                    </Row>


                </Col>
            </Row>
            <Row style={{ height: '20px' }}>

            </Row>
            <Row>
                {/* Success Modal */}
                <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                    <Modal.Header className='modal-header'>
                        <Modal.Title >File Uploaded Successfully!</Modal.Title>
                    </Modal.Header>
                </Modal>
            </Row>

            {/* Display selected file variable */}

        </Container>
    );
};

export default PreparePrint;
