import React from 'react';
import Logo from '../assets/images/traveloka_pic.png';
import User from '../pages/User/User';
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = (prop) => {
  const Navigate = useNavigate();
  return (
    <div class='background'>
      <div id="header">
        <div id="left"> </div>
        <div id="sub-header">
          <img src={Logo} alt="" width="150px" onClick={() => { Navigate("/") }} />
        </div>
        <User></User>
      </div>
    </div>
  )
}

export default Header