import React from "react";
import { Link } from 'react-router-dom';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Input({type, id, name, label, placeholder, autofocus}) {
  return (
    <div>
      <div className="d-flex align-items-start mx-4">{label}</div>
      <input
        autoFocus={autofocus}
        type={type} 
        id={id} 
        name={name} 
        placeholder={placeholder}
        className="input_box rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
      />
    </div>
  );
}

function InputForm() {
  return (
    <div className="d-flex flex-column justify-content-start w-100 rounded-circle">
      <Input
        type="email" 
        id="email" 
        name="email" 
        label="Email Address" 
        placeholder="me@example.com" 
        autofocus={true}
      />
      <Input 
        type="password" 
        id="password" 
        name="password" 
        label="Password" 
        placeholder="••••••••••" 
      />
      <Link to='/buy'>
        <button className="button_box w-50 h-40 text-white my-2">
          Đăng Nhập
        </button>
      </Link>
    </div>
  )
}

const Login = () => {
  const logoBK = require('./../../assets/Image/logoBK.png')
  const google = require('./../../assets/Image/google-icon.png')
  return (
    <div className = "login_bg">
      <div className = "login_form">
        <div className = "box">
          <div className = "logo_box">
            <img src={logoBK} alt='logo_BK' className='logo_BK' />  
          </div>
          <div className = "content_box">
            <div className = "register">
              Bạn chưa có tài khoản?
              Đăng kí ngay!
            </div>
            <div className = "login_using_google">
              <img src={google} alt='google' className='google' />  
              Đăng nhập bằng Google
            </div>

            <div className = "input_box_layout">
              <InputForm></InputForm>
                <div className = "label_content">Quên mật khẩu</div>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;