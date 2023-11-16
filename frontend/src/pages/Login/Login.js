import React from "react";
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Button({value}) {
  const handleClick = (e) => {
    e.preventDefault();
    // Rest of your event handling logic
  };

  return (
    <button 
      onClick={handleClick}
      className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
      {value}
  </button>
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
              <div className = "input_box_content">
                <div className = "label_box">
                  <div className = "label_content">Email</div>
                </div>
                <div>
                <input
                  type="email"
                  id="email" 
                  name="email" 
                  label="Email Address" 
                  placeholder="me@example.com" 
                  autofocus={true}
                  className="input_box rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
                  />
                </div>
                <div className = "label_box">
                  <div className = "label_content">Password</div>
                </div>
                <div>
                <input
                  type="email"
                  id="email" 
                  name="email" 
                  label="Email Address" 
                  placeholder="me@example.com" 
                  autofocus={true}
                  className="input_box rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
                  />
                </div>
                <div className = "label_box button_box">
                  <button>
                    Đăng nhập
                  </button>
                </div>
                <div className = "forget_password_box">
                  Quên mật khẩu
                </div>
              </div>                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;