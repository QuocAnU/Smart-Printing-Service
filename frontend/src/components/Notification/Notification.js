
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap'
import axios from 'axios';


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
                    // console.log('List Printer:', response.data);
                    setUseLog(response.data);
                    setLoading(false);

                })
                .catch((error) => {
                    // console.error('Error fetching user profile:', error);
                });
        }

    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Row style={{ display: 'flex' }} >
            {useLog.fileName ? (
                <Row>
                    <p>File: {useLog.fileName} </p>
                    <p> Đã được in xong vào lúc: {useLog.timeEnd}</p>
                </Row>
            ) : (
                <p>Không có thông báo</p>
            )}
        </Row >

    );
}

export default Notifications;