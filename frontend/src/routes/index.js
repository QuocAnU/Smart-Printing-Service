import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './../components/Header/Header.js';
import Login from './../pages/Login/Login.js';
import HomePage from './../pages/HomePage/Homepage.js';
import PrintPrepare from './../pages/PrintPreparePage/PrintPrepare.js';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <Router>
            {/* Conditionally render the Header based on the login status */}
            {isLoggedIn && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

            <Routes>
                {/* Pass isLoggedIn and setIsLoggedIn to the Login component */}
                <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/print" element={<PrintPrepare />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;