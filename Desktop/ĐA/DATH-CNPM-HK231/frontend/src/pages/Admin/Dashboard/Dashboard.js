import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowDashboard from './ShowDashboard';

const Dashboard = () => {
    return (
        <Container fluid className='p-0'>
            <div className='d-flex'>
                <div style={{ position: 'static' }}>
                    <Sidebar />
                </div>
                <div style={{ flex: '1' }}>
                    <Container fluid className='ps-2 pe-2'>
                        <Row>
                            <Col xs={12} sm={12}>
                                <ShowDashboard />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Container>
    )
}
export default Dashboard;