import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../components/Header/Header.js';
import Login from './../pages/Login/Login.js';
import HomePage from './../pages/HomePage/Homepage.js';
import Print from '../pages/Print/Print.js';

const AppRoutes = ({ showHeader, isLoggedIn, setIsLoggedIn }) => {
    return (
        <Router>
            {/* Conditionally render the Header based on the login status */}
            {showHeader && <Header showHeader={showHeader} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

            <Routes>
                {/* Pass isLoggedIn and setIsLoggedIn to the Login component */}
                <Route path="/login" element={<Login showHeader={showHeader} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/" element={<HomePage />} />
                <Route path='/print' element={<Print />} />
            </Routes>
        </Router>
    );
};
const mapStateToProps = (state) => ({
    showHeader: state.showHeader,

});
export default connect(mapStateToProps)(AppRoutes);