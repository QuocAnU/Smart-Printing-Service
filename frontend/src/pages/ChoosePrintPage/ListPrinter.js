import React, { useState } from "react";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import ReactSearchBox from "react-search-box";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './ListPrint.css'


const ListPrinter = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [printer, setPrinter] = useState([
        { model: 'HP - MFP M236SDW', id: '001', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '002', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '003', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '004', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '005', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '006', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '007', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '008', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '009', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '010', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '011', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '012', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '013', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '014', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '015', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '016', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG TRỐNG' },
        { model: 'HP - MFP M236SDW', id: '017', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '018', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '019', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '020', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'ĐANG ĐẦY' },
        { model: 'HP - MFP M236SDW', id: '021', campuslocation: 'CS1', buildinglocation: 'C6202', status: 'CHƯA ĐẦY' },



    ]);

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleSearch = (keyword) => {
        setCurrentPage(1); // Reset trang về 1 khi bắt đầu tìm kiếm mới
        setSearchKeyword(keyword);
    };

    const filteredPrinters = printer.filter((printer) =>
        Object.values(printer).some((value) =>
            value.toLowerCase().includes(searchKeyword.toLowerCase())
        )
    );

    const totalFilteredResults = filteredPrinters.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(totalFilteredResults / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    const displayedPrinters = filteredPrinters.slice(startIndex, endIndex);
















    // const handleEdit = (bookId) => {
    //     console.log(`Edit book with ID ${bookId}`);
    // };

    // const handleDelete = (bookId) => {
    //     console.log(`Delete book with ID ${bookId}`);
    // };
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
                                <ReactSearchBox
                                    width="110%"
                                    placeholder="Search Here..."
                                    onChange={(value) => handleSearch(value)}
                                />
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
                                            <TableCell id="text" >ID</TableCell>
                                            <TableCell id="text" >CƠ SỞ</TableCell>
                                            <TableCell id="text" > VỊ TRÍ</TableCell>
                                            <TableCell id="text" >TÌNH TRẠNG</TableCell>
                                            <TableCell id="text" >Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedPrinters.map((printer) => (
                                            <TableRow key={printer.id}>
                                                <TableCell id="text_list">{printer.model}</TableCell>
                                                <TableCell id="text_list">{printer.id}</TableCell>
                                                <TableCell id="text_list">{printer.campuslocation}</TableCell>
                                                <TableCell id="text_list">{printer.buildinglocation}</TableCell>

                                                {/* <TableCell id="text_list">{printer.status}</TableCell> */}

                                                <TableCell id="text_list" style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span className={`status-indicator ${printer.status.replace(' ', '-')}`} />

                                                </TableCell>
                                                <TableCell id="text_list" align="center" >

                                                    <Button id="text_r" style={{ padding: '2px' }}
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


        </Container>
    )
};


export default ListPrinter;