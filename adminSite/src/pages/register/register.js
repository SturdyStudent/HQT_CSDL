import React, { useState } from 'react';
import Logo from '../../assets/images/traveloka_pic.png';
import Header from '../../components/header/header';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { axiosConfig } from '../../axiosConfig';

function Register() {
    const [MaHangBay, setMaHangBay] = useState('');
    const [TenHangBay, setTenHangBay] = useState('');
    const [TenDangNhap, setTenDangNhap] = useState('');
    const [MatKhau, setMatKhau] = useState('');
    const [SoHanhLi, setSoHanhLi] = useState();
    const [redirectHome, setRedirectHome] = useState(false);
    const registerPartner = `${axiosConfig}getPartners`;

    if (redirectHome) {// chuyển hướng đến trang partner sau khi đăng kí thành công
        return <Navigate to={'/partner'} replace />
    }

    const changeMaHangBay = e => setMaHangBay(e.target.value);
    const changeTenHangBay = e => setTenHangBay(e.target.value);
    const changeTenDangNhap = e => setTenDangNhap(e.target.value);
    const changeMatKhau = e => setMatKhau(e.target.value);
    const changeHanhLi = e => setSoHanhLi(e.target.value);

    const handleRegister = (e) => {
        axios.post(registerPartner, {
            MaHangBay: `${MaHangBay}`,
            TenHangBay: `${TenHangBay}`,
            HinhAnhHangBay: null,
            TenDangNhap: `${TenDangNhap}`,
            MatKhau: `${MatKhau}`,
            SoHanhLiXachTay: Number(SoHanhLi)
        }).then((res) => {
            localStorage.setItem('USER_LOGIN_INFORMATION', JSON.stringify(res.data));
            if (res.status == 201) {
                setRedirectHome(true)
            }
        })
            .catch((error) => {
                console.error(error)
            });
        e.preventDefault();
    }

    return (
        <div className="row login-bg" style={{ "margin": "0px", minHeight: "150vh" }}>
            <Header></Header>
            <div className=' d-flex justify-content-center align-items-center card-parent'>
                <div class="card p-4 shadow-lg" style={{ width: '25rem', borderRadius: "20px" }}>
                    <div class="card-body">
                        <div className='justify-content-center mb-3 text-center'>
                            <img src={Logo} height="40px"></img>
                        </div>
                        <h5 class="card-title fw-bold">Tạo tài khoản Partner mới!</h5>
                        <p class="card-text">Lên danh sách những chuyến bay tại Traveloka và để chúng tôi giúp bạn kết nối với hàng triệu người dùng!</p>
                        <form id='form'>
                            <p className='fw-bold'>Chọn mã hãng bay</p>
                            <input type="text" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập tên đăng nhập' ></input>
                            <p className='fw-bold'>Mật khẩu</p>
                            <input type="password" name='pass' className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' ></input><br />
                            <p className='fw-bold'>Tên đăng nhập</p>
                            <input type="text" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập tên đăng nhập' ></input>
                            <p className='fw-bold'>Mật khẩu</p>
                            <input type="password" name='pass' className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' ></input><br />
                            <p className='fw-bold'>Tên đăng nhập</p>
                            <input type="text" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập tên đăng nhập' ></input>
                            <p className='fw-bold'>Mật khẩu</p>
                            <input type="password" name='pass' className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' ></input><br />
                            <p className='fw-bold'>Tên đăng nhập</p>
                            <input type="text" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập tên đăng nhập' ></input>
                            <input type="submit" className='border-0 p-2 text-white col-md-12' value="Đăng nhập" name='submit' style={{ "backgroundColor": "#FF5F1F" }} ></input>
                            <div className='text-center mt-3'> <b>Đã có tài khoản?</b> &nbsp;
                                <Link to={'/login'} style={{ textDecoration: "none", fontWeight: "500" }}>
                                    <span>Đăng nhập ngay!</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register