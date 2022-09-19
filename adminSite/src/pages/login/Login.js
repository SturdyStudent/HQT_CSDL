import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/traveloka_pic.png';
import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import axios from 'axios';
import auth from '../../auth';
import './PartnerLoginPage.css'
import { axiosConfig } from '../../axiosConfig';

function PartnerLoginPage() {
  const loginUrl = `${axiosConfig.url}partner-login`;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  if (redirect) {
    return <Navigate to={"/"} replace />
  }
  const handleLogin = (e) => {
    axios.post(loginUrl, {
      username: username,
      password: password
    }).then((res) => {
      localStorage.setItem('LOGIN_INFORMATION', JSON.stringify(res.data));
      if (res.data.toString().length > 0) {
        auth.login(() => {
          console.log("chuyển trang nữa")
          setRedirect(true);
        })
      } else {
        alert("Nhập sai tên đăng nhập hoặc mật khẩu");
      }
    })
    e.preventDefault();
  }
  return (
    <div className="row login-bg" style={{ "margin": "0", maxHeight: "100vh" }}>
      <Header></Header>
      <div className=' d-flex justify-content-center align-items-center card-parent'>
        <div class="card p-4 shadow-lg" style={{ width: '25rem', borderRadius: "20px" }}>
          <div class="card-body">
            <div className='justify-content-center mb-3 text-center'>
              <img src={Logo} height="40px"></img>
            </div>
            <h5 class="card-title fw-bold">Chào mừng đã quay lại!</h5>
            <p class="card-text">Đăng nhập để quản lí những những chuyến bay của bạn từ việc kiểm
              tra lợi nhuận cho đến quản lí chuyển bay</p>
            <form id='form'>
              <p className='fw-bold'>Tên đăng nhập</p>
              <input type="text" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập tên đăng nhập' value={username} onChange={onChangeUsername}></input>
              <p className='fw-bold'>Mật khẩu</p>
              <input type="password" name='pass' className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' value={password} onChange={onChangePassword}></input><br />
              <input type="submit" className='border-0 p-2 text-white col-md-12' value="Đăng nhập" name='submit' style={{ "backgroundColor": "#FF5F1F" }} onClick={handleLogin}></input>
              <div className='text-center mt-3'> <b>Chưa có mật khẩu?</b> &nbsp;
                <Link to={'/register'} style={{ textDecoration: "none", fontWeight: "500" }}>
                  <span>Đăng kí ngay!</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLoginPage