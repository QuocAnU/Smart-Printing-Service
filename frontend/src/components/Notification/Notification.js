
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import SearchBox from "../Search/Search";


function Notifications() {

    const [useLog, setUseLog] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get('http://localhost:8001/printing-setup/get-latest-print-log', {
                headers: {

                    Authorization: `Bearer ${accessToken}`,

                },
                withCredentials: true,
            })
                .then((response) => {
                    console.log('List Printer:', response.data);
                    setUseLog(response.data);
                    setLoading(false);

                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }

    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <Row style={{ marginTop: '30px' }}>

                <Row style={{ width: "102%", marginTop: "30px" }}>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <TableContainer component={Paper} style={{ border: "3px solid grey" }}>
                            <Table>
                                <TableBody>
                                    {useLog.map((useLog) => (
                                        <TableRow key={useLog.timeStart}>
                                            <TableCell id="text_list">{ }</TableCell>
                                            <TableCell id="text_list">{ }</TableCell>
                                            <TableCell id="text_list">{useLog.numPrintedPage}</TableCell>
                                            <TableCell id="text_list">{ }</TableCell>
                                            <TableCell id="text_list">{useLog.timeStart}</TableCell>
                                            <TableCell id="text_list">{useLog.timeEnd}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                    <Col xs={1} ></Col>

                </Row>
            </Row>
        </Container>

    );
}

export default Notifications;