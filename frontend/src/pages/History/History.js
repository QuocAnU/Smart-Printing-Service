
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import SearchBox from "../../components/Search/Search";
import './History.css'

function History() {

    const [useLog, setUseLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get('http://localhost:8001/printing-setup/get-user-log', {
                headers: {

                    Authorization: `Bearer ${accessToken}`,

                },
                withCredentials: true,
            })
                .then((response) => {
                    // console.log('List Printer:', response.data);
                    setUseLog(response.data);
                    setLoading(false);

                })
                .catch((error) => {
                    // console.error('Error fetching user profile:', error);
                    if (error.response.status === 401){
                        localStorage.setItem('isLoggedIn', false);
                        localStorage.setItem('accessToken', '');
                    }
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

    const filteredPrinters = useLog.filter((useLog) => {
        const mainInfoMatch = Object.values(useLog).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        return mainInfoMatch;
    }
    );
    const totalFilteredResults = filteredPrinters.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(totalFilteredResults / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const sortedPrinters = filteredPrinters.sort((a, b) => {
        const timeA = new Date(a.timeStart).getTime();
        const timeB = new Date(b.timeStart).getTime();
        return timeA - timeB;
    });
    const displayedPrinters = sortedPrinters.reverse().slice(startIndex, endIndex);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <Row style={{ marginTop: '30px' }}>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={5} style={{ display: "flex" }}>
                        <strong style={{ textAlign: "left", fontSize: "40px", fontWeight: "700" }}>LỊCH SỬ IN</strong>
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
                                        <TableCell id="text" >FILE IN</TableCell>
                                        <TableCell id="text" >SỐ TRANG IN</TableCell>
                                        <TableCell id="text" >SỐ DƯ CÒN LẠI</TableCell>
                                        <TableCell id="text" >GỬI IN LÚC</TableCell>
                                        <TableCell id="text" >IN XONG LÚC</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedPrinters.map((useLog) => (
                                        <TableRow key={useLog._id}>
                                            <TableCell style={{ width: '10%' }} id="text_list">{useLog?.fileName}</TableCell>
                                            <TableCell style={{ width: '15%' }} id="text_list">{useLog.numPrintedPage}</TableCell>
                                            <TableCell style={{ width: '25%' }} id="text_list">{useLog.userBalance}</TableCell>
                                            <TableCell style={{ width: '25%' }} id="text_list">{useLog.timeStart}</TableCell>
                                            <TableCell style={{ width: '25%' }} id="text_list">{useLog.timeEnd}</TableCell>

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
        </Container>

    );
}

export default History;