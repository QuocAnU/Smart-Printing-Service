

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { hideHeader, showHeader } from './../../components/Store/action.js';

import { useDispatch } from 'react-redux';

function Input({ type, id, name, label, placeholder, value, onChange, error, errorMessage }) {
  return (
    <div>
      <div className="d-flex align-items-start mx-4">{label}</div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`input_box rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border ${error ? 'border-red-500' : 'border-gray-200'
          } focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function InputForm({ onSubmit, AuthError, AuthErrorMessage }) {
  // function InputForm({ onSubmit, showHeader, setShowHeader, AuthError, AuthErrorMessage }) {
  const [BKNetID, setBKNetID] = useState('');
  const [BKNetIDError, setBKNetIDError] = useState(false);
  const [BKNetIDErrorMessage, setBKNetIDErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');



  const handleBKNetIDChange = (e) => {
    setBKNetID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform form validation here
    if (BKNetID === '') {
      setBKNetIDError(true);
      setBKNetIDErrorMessage('Please enter your BKNetID');
      return;
    }

    if (password === '') {
      setBKNetIDError(false);
      setBKNetIDErrorMessage('');
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
      return;
    }

    // If form is valid, proceed with login
    onSubmit(BKNetID, password);
  };

  return (
    <div className="w-100">
      <ErrorDisplay
        error={BKNetIDError || passwordError || AuthError}
        errorMessage={BKNetIDErrorMessage || passwordErrorMessage || AuthErrorMessage}
      />
      <div className="input_box_layout">
        <div className="d-flex flex-column justify-content-start w-100 rounded-circle">
          <Input
            type="text"
            id="BKNetID"
            name="BKNetID"
            label="Username"
            placeholder=""
            value={BKNetID}
            onChange={handleBKNetIDChange}
            error={BKNetIDError}
            errorMessage={BKNetIDErrorMessage}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            errorMessage={passwordErrorMessage}
          />
          <button className="button_box w-50 h-40 text-white my-2" onClick={handleFormSubmit}>
            Đăng Nhập
          </button>
        </div>
        <div className="label_content">Quên mật khẩu</div>
      </div>
    </div>
  );
}

const ErrorDisplay = ({ error, errorMessage }) => {
  return (
    <div>
      {error && (
        <div className="errorbox justify-content-center align-items-center w-75">
          <div className="errorcontent tw-70 h-40 text-white my-2">
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// const Login = ({ showHeader, setShowHeader, isLoggedIn, setIsLoggedIn, hideHeader }) => {
const Login = ({ isLoggedIn, setIsLoggedIn, hideHeader }) => {
  const logoBK = require('./../../assets/Image/logoBK.png');
  const google = require('./../../assets/Image/google-icon.png');

  const [AuthError, setAuthError] = useState(false);
  const [AuthErrorMessage, setAuthErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')){
      navigate("/")
    }
    else hideHeader(); // Gọi hideHeader trong useEffect để đảm bảo rằng trạng thái đã được cập nhật
  }, [hideHeader]);

  const handleSuccessfulLogin = () => {
    // setShowHeader(true);
    dispatch(showHeader());
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    // localStorage.setItem('showHeader', true);
    navigate("/");
    // console.log('Login successful');
  };

  const handleLoginError = (errorMessage) => {
    // setShowHeader(false); // or leave it as it is based on your logic
    // console.log(errorMessage);
    setAuthErrorMessage(errorMessage); // Set the specific error message
    setAuthError(true); // Set AuthError to true to trigger the ErrorDisplay
  };

  const handleSubmit = (BKNetID, password) => {
    axios.post('http://localhost:8001/acc/login', { BKNetID, password })
      .then((res) => {
        // console.log('Username:', BKNetID);
        // console.log('Password:', password);
        // console.log(res);
        //console.log(res.data.access_token);
        const token = res.data.access_token;
        localStorage.setItem('accessToken', token);
        handleSuccessfulLogin();
      })
      .catch(err => {
        if (err.response && err.response.status) {
          // console.log(err);
          handleLoginError("Incorrect Username or Password");
        }
      });
  };

  return (
    <div className="login_bg">
      <div className="login_form">
        <div className="box">
          <div className="logo_box">
            <img src={logoBK} alt='logo_BK' className='logo_BK' />
          </div>

          <div className="content_box">
            <div className="title text-black">
              Central Authentication Service
            </div>

            <div className="login_using_google w-50">
              <img src={google} alt='google' className='google' />
              <div className="google_input">
                Đăng nhập bằng Google
              </div>
            </div>
            <InputForm
              onSubmit={handleSubmit}
              // showHeader={showHeader}
              // setShowHeader={setShowHeader}
              AuthError={AuthError}
              AuthErrorMessage={AuthErrorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { hideHeader })(Login);
