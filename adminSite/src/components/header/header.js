import React from 'react';
import Logo from '../../assets/images/traveloka_pic.png'
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Navigate = useNavigate();
  return (
    <div class='header-container'>
      <div id="header">
        <div id="left"> </div>
        <div id="sub-header">
          <img src={Logo} alt="" width="150px" onClick={() => { Navigate("/") }} />
        </div>
      </div>
    </div>
  )
}

export default Header