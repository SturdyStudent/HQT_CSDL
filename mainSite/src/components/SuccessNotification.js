import React from 'react'
import './SuccessNotification.css'
import { Link } from 'react-router-dom'
import SuccessPayment from '../assets/images/successPayment.jpg'

export default function SuccessNotification() {
    return (
        <div className='container-out-notification'>
            <div className='container-notification'>
                <img alt='...' src={SuccessPayment} width="470px" height="200px" style={{ "border": "none" }} />
                <div>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <button className='back-notification-btn'>Quay về trang chủ</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
