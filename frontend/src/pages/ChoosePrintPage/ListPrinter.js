import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Buttons from "react-bootstrap/Button"

// import ReactSearchBox from "react-search-box";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './ListPrint.css'
import SearchBox from "../../components/Search/Search";

const ListPrinter = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [printer, setPrinter] = useState([]);
    const [choossePrinter, setChoosePrinter] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
                    console.log('List Printer:', response.data);
                    setPrinter(response.data);

                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }

    }, []);


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

    const handleChoosePrinter = async (id) => {
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



                    console.log("Data printer:", dataJson);

                    const responseApi = await axios.post(
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

                    console.log('Response from API:', responseApi.data);
                    setShowSuccessModal(true);
                    setTimeout(() => {
                        setShowSuccessModal(false);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Choose Printer failed. Please try again.'); // Set an appropriate error message
            setShowErrorModal(true);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);

    };
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };

    return (

        <Container>
            <Row xs={12}>
                <Row style={{ marginTop: '30px' }}>
                    <strong style={{ textAlign: "left", fontSize: "20px", fontWeight: "500" }}>Trở lại</strong>
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
                                                {/* <TableCell id="text_list">{printer.id}</TableCell> */}
                                                <TableCell id="text_list">{printer.location.CampusLocation}</TableCell>
                                                {/* <TableCell id="text_list">{printer.location.BuildingLocation} {printer.location.RoomLocation}</TableCell> */}
                                                <TableCell id="text_list">{`${printer.location.BuildingLocation}_${printer.location.RoomLocation}`}</TableCell>

                                                {/* <TableCell id="text_list">{printer.status}</TableCell> */}

                                                <TableCell id="text_list" style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span className={`status-indicator ${printer.PrinterStatus}`} />

                                                </TableCell>
                                                <TableCell id="text_list" align="center" >

                                                    <Button id="text_r" style={{ padding: '2px' }} onClick={() => handleChoosePrinter(printer._id)}
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
            </Row>
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header className='modal-header'>
                    <Modal.Title>Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Gửi file in thành công</p>

                </Modal.Body>

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
    )
};


export default ListPrinter;