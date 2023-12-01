import React, { useState, useRef } from 'react';
import './PrintPrepair.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PreparePrint = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const setDefaultCount = "All"
    const [printConfig, setPrintConfig] = useState({
        pageSize: 'A4',
        duplex: 2,
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

    const handleUpload = async () => {
        try {
            // Gửi selectedFile lên API1
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                const responseApi1 = await axios.post('http://localhost:8001/printing-setup/upload', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                    file: selectedFile,  // Chắc chắn rằng API1 có thể xử lý đúng định dạng file mà bạn muốn
                });

                // Gửi printConfig lên API2
                const responseApi2 = await axios.post('http://localhost:8001/printing-setup/setup-cpnfig', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                    printConfig: printConfig,
                });

                // Xử lý phản hồi từ cả hai API (responseApi1 và responseApi2)
                console.log('Response from API1:', responseApi1.data);
                console.log('Response from API2:', responseApi2.data);
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
                <Col xs={1}></Col>
                {selectedFile ? (
                    <Col xs={3} style={{ textAlign: 'right' }}>
                        <Form.Control
                            style={{ width: '34%' }}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </Col>

                ) : (
                    <Col xs={3}></Col>
                )}

                <Col style={{ textAlign: 'left' }} >  <h2 className="mb-4"   >Thông số in </h2> </Col>

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

                                    as="select"
                                    className="text-center"
                                    value={printConfig.pageSize}
                                    onChange={(e) => handlePrintConfigChange('pageSize', e.target.value)}
                                >
                                    <option value="A4">A4</option>
                                    <option value="A0">A0</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="A3">A3</option>
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
                                    className="text-center"
                                    value={printConfig.duplex}
                                    onChange={(e) => handlePrintConfigChange('duplex', parseInt(e.target.value))}
                                >
                                    <option value={1}>2</option>
                                    <option value={2}>1</option>
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
                    <Row>
                        <Col xs={12} style={{ marginTop: '80px' }} >
                            {/* Upload button */}
                            <Button variant="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </Col>
                    </Row>



                </Col>
            </Row>
            <Row style={{ height: '20px' }}>

            </Row>


            {/* Display selected file variable */}
            {selectedFile && (
                <Row>
                    <Col xs={12} md={6}>
                        <p>
                            Selected File: <span>{selectedFile.name}</span>
                        </p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default PreparePrint;
