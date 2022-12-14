import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import SmallFlight from '../../assets/images/small_flight.png'
import MockRightArrow from '../../assets/images/mock_right_arrow.png'
import Vietjet from '../../assets/images/vietjet.png'
import Detail from '../../assets/images/detail.png'
import Line from '../../assets/images/line.png'
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi'
import { Link, Navigate } from 'react-router-dom'
import Checked from '../../assets/images/checked.png'
import { axiosConfig } from '../../axiosConfig'
import './PreBooking.css'

function PreBooking() {
    const [redirect, setRedirect] = useState(false);
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState();
    const [partnerName, setPartnerName] = useState(null);
    const getPartnerUrl = `${axiosConfig.url}getPartners`;
    const locationUrl = `${axiosConfig.url}getLocations`;

    let flightInfo = JSON.parse(localStorage.getItem("SUMMARY_INFO"));
    let searchInfo = JSON.parse(localStorage.getItem("SEARCH_INFO"));

    var gioDi = format(new Date(flightInfo.NgayGioKhoiHanh), 'yyyy/MM/dd hh:mm:ss');
    var gioDen = format(new Date(flightInfo.NgayGioDen), 'yyyy/MM/dd hh:mm:ss');

    var day1 = new Date(gioDi);
    var day2 = new Date(gioDen);

    var difference = Math.abs(day2 - day1);
    var round = Math.floor(difference / (3600000));
    var spare = (difference % 3600000) / 60000;

    const formatSearchNgayDi = format(new Date(flightInfo.NgayGioKhoiHanh), "iii, dd 'Thg' MM yyyy", {
        locale: viLocale
    });
    useEffect(() => {
        axios.get(locationUrl)
            .then(response => {
                let valStart = response.data.filter(location => location.MaDiaDiem === flightInfo.DiaDiemKhoiHanh);
                let valEnd = response.data.filter(location => location.MaDiaDiem === flightInfo.DiaDiemDen);
                setStartLocation(valStart[0].TenDiaDiem);
                setEndLocation(valEnd[0].TenDiaDiem);
            })
    }, [locationUrl, flightInfo.DiaDiemDen, flightInfo.DiaDiemKhoiHanh])
    useEffect(() => {
        axios.get(getPartnerUrl)
            .then(response => {
                let valPartner = response.data.filter(partner => partner.MaHangBay === flightInfo.HangBay);
                setPartnerName(valPartner[0].TenHangBay);
            })
    }, [getPartnerUrl, flightInfo.HangBay])

    if (redirect) {
        localStorage.setItem("TRANSFER_INFO", "nothing");
        return <Navigate to={"/booking-fill"} replace />
    }
    const totalPrice = flightInfo.GiaVe * searchInfo.NguoiLon + flightInfo.GiaVe * 75 / 100 * searchInfo.TreEm + flightInfo.GiaVe * 25 / 100 * searchInfo.EmBe;
    return (
        <div>
            <Header />
            <div className='prebooking-background-blue'></div>
            <div className='prebooking-container'>
                <div className='prebooking-header-card'>
                    <div>
                        <h4><b>Chuy???n bay t??? {startLocation} t???i {endLocation}</b></h4>
                        <div className='prebooking-header-card-sub'>
                            <div><span><img src={SmallFlight} alt='...' width="30px" /></span></div>
                            <div>
                                <div>{startLocation} ({flightInfo.DiaDiemKhoiHanh}) ??? {endLocation} ({flightInfo.DiaDiemDen})    |   {formatSearchNgayDi.split(",")[1]}</div><br />
                                <div>{searchInfo.NguoiLon} ng?????i l???n {searchInfo.TreEm} tr??? em {searchInfo.EmBe} em b?? &nbsp;&nbsp; | &nbsp;&nbsp; {searchInfo.HangGhe}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='prebooking-sub-container'>
                    <div className='prebooking-info'>
                        <div><img alt='...' src={SmallFlight} width="50px" />H?? N???i (HAN) <span><img alt='...' src={MockRightArrow} width="40px" /></span> ???? N???ng (DAD)</div>
                        <div>Th??ng tin chuy???n bay</div>
                        <hr />
                        <div className='prebooking-info-date'>{formatSearchNgayDi}</div>
                        <div className='prebooking-info-container'>
                            <table>
                                <tr className='prebooking-info-container-first-row'>
                                    <td rowSpan={2}><img alt='...' src={Vietjet} width="70px" /></td>
                                    <td className='prebooking-discount'>
                                        <div>{partnerName}</div><br></br>
                                        <div style={{ "color": "#999ca0" }}>Khuy???n m??i</div>
                                    </td>
                                    <td>
                                        <table className='prebooking-info-container-container'>
                                            <tr>
                                                <td>{format(new Date(flightInfo.NgayGioKhoiHanh), 'HH:mm')}</td>
                                                <td rowSpan={2}>
                                                    <div style={{ "color": "#68717c", "fontSize": "small" }}>{round}h {spare}m</div><br />
                                                    <img alt='...' src={Line} width="150px " ></img><br />
                                                    <div style={{ "color": "#68717c", "fontSize": "small", "fontWeight": "bold" }}>Bay th???ng</div>
                                                </td>
                                                <td>{format(new Date(flightInfo.NgayGioDen), 'HH:mm')}</td>
                                            </tr>
                                            <tr className='prebooking-info-container-bold'>
                                                <td>{flightInfo.DiaDiemKhoiHanh}</td>
                                                <td>{flightInfo.DiaDiemDen}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className='prebooking-right-column'>
                        <div className='prebooking-supplement-info'>
                            <div className='prebooking-header-supplement-info'>
                                <div><span><img alt='...' src={Detail} width="40px" /></span>Th??ng tin b??? sung</div>
                                <div style={{ "width": "50px", "fontSize": "medium", "fontWeight": "normal", "marginLeft": "50px", "color": "#1a7ed5", "textShadow": "initial" }} >Chi ti???t</div>
                            </div>
                            <hr />
                            <div className='prebooking-body-supplement-info'>
                                <div>{flightInfo.DiaDiemKhoiHanh} ??? {flightInfo.DiaDiemDen}</div><br />
                                <div class="prebooking-detail-refund" style={{ "margin": "0px", "padding": "0px" }}>
                                    <div><span><img alt='...' src={Checked} width="30px" /></span>C?? ho??n ti???n</div><br />
                                    <div style={{ "margin": "0px" }}><span><img alt='...' src={Checked} width="30px" /></span>C?? ??p d???ng ?????i l???ch bay</div>
                                </div>
                            </div>
                        </div>
                        <div className='prebooking-summary'>
                            <div>T??m t???t</div>
                            <hr />
                            {searchInfo && <div className='prebooking-summary-adult prebooking-summary-item'>
                                <div>{partnerName} (Ng?????i l???n) x{searchInfo.NguoiLon}</div>
                                <div>VN?? {flightInfo.GiaVe * searchInfo.NguoiLon}</div>
                            </div>}
                            {searchInfo && <div className='prebooking-summary-adult prebooking-summary-item'>
                                <div>{partnerName} (Tr??? em) x{searchInfo.TreEm}</div>
                                <div>VN?? {flightInfo.GiaVe * 75 / 100 * searchInfo.TreEm}</div>
                            </div>}
                            {searchInfo && <div className='prebooking-summary-adult prebooking-summary-item'>
                                <div>{partnerName} (Em b??) x{searchInfo.EmBe}</div>
                                <div>VN?? {flightInfo.GiaVe * 25 / 100 * searchInfo.EmBe}</div>
                            </div>}
                            <div className='prebooking-summary-total-price prebooking-summary-item'>
                                <div>G??a b???n tr???</div>
                                <div>VN?? {totalPrice.toLocaleString()}</div>
                            </div>
                        </div>
                        <Link to='/booking-fill' style={{ textDecoration: 'none' }}>
                            <button style={{ "marginBottom": "100px" }} onClick={() => setRedirect(true)}>Ti???p t???c</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreBooking