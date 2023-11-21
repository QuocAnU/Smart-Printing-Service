import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function Input({ type, id, name, label, placeholder, value, onChange, error, errorMessage }) {
  return (
    
    <div>
      <div className="d-flex align-items-start mx-4">{label}</div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`input_box rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border ${
          error ? 'border-red-500' : 'border-gray-200'
        } focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100`}
        value={value}
        onChange={onChange}
      />
      
    </div>
  );
}

function InputForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [AuthError, setAuthError] = useState(false);
  const [AuthErrorMessage, setAuthErrorMessage] = useState('');


  const navigate = useNavigate();
  //useEffect(()=>{})
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform form validation here
    if (email === '') {
      setEmailError(true);
      setEmailErrorMessage('Please enter your BKNetID');
      return;
    }

    if (password === '') {
      setEmailError(false);
      setEmailErrorMessage('');
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
      return;
    }

    // If form is valid, proceed with login

    axios.post('http://localhost:8001/acc/login',{BKNetID: email,password: password})
    .then((res)=>{
      console.log('Username:', email);
      console.log('Password:', password);
      console.log(res);
      navigate("/print");
      console.log('Login successful');
    })
    .catch(err => {
      if(err.response.status){
        console.log(err);
        setAuthError(true);
        setAuthErrorMessage("Incorrect Username or Password");
      }
    });
    setEmail('');
    setEmailError(false);
    setEmailErrorMessage('');

    setPassword('');
    setPasswordError(false);
    setPasswordErrorMessage('');
  };

  return (
    <div className="w-100">
      <ErrorDisplay
      error = {emailError||passwordError||AuthError}
      errorMessage = {emailErrorMessage||passwordErrorMessage||AuthErrorMessage}
    />
      <div className="input_box_layout">
    <div className="d-flex flex-column justify-content-start w-100 rounded-circle">
      <Input
        type="email"
        id="email"
        name="email"
        label="Username"
        placeholder=""
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        errorMessage={emailErrorMessage}
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
      <button className="button_box w-50 h-40 text-white my-2" onClick={handleSubmit}>
        Đăng Nhập
      </button>
    </div>
    <div className="label_content">Quên mật khẩu</div>
  </div>
    </div>
  
  );
}
const ErrorDisplay = ({error, errorMessage}) => {
  return (
  <div>
    {error && <div className="errorbox justify-content-center align-items-center w-75">
    <div className="errorcontent tw-70 h-40 text-white my-2">{errorMessage}</div>
    </div>}
  </div>
);
}
const Login = () => {
  const logoBK = require('./../../assets/Image/logoBK.png')
  const google = require('./../../assets/Image/google-icon.png')
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
            <InputForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;