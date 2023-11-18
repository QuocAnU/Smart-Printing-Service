
import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ShowList from './ShowList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";


// import Forms from '../../../components/AddBooks/Addbooks';

const ListPage = () => {
    return (
        <Container fluid className='p-0'>
            <div className='d-flex'>
                <div style={{position:'static'}}>
                    <Sidebar />
                </div>
                <div style={{flex:'1'}}>
                    <Container fluid className='ps-2 pe-2'>
                        <Row>
                            <Col xs={12} sm={12}>
                                <ShowList />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default ListPage;
