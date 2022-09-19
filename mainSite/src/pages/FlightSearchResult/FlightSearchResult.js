import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import East from '../../assets/images/right_arrow.png';
import SearchIcon from '../../assets/images/search_icon.png'
import Vietjet from '../../assets/images/vietjet.png'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi'
import Line from '../../assets/images/line.png'
import './FlightSearchResult.css';
import axios from 'axios';
import { axiosConfig } from '../../axiosConfig';

function FlightSearchResult() {
    const getFlightUrl = `${axiosConfig.url}getFlights/query`;
    const getPartnerUrl = `${axiosConfig.url}getPartners`;
    // const getSeatClassUrl = `${axiosConfig.url}getSeatClass`;
    const flightSearchInfo = JSON.parse(localStorage.getItem("SEARCH_INFO"));
    const formatSearchNgayDi = format(new Date(flightSearchInfo.NgayDi), "iii, dd 'Thg' MM yyyy", {
        locale: viLocale
    });
    const diaDiemDi = flightSearchInfo.DiaDiemDi;
    const diaDiemDen = flightSearchInfo.DiaDiemDen;
    const formatDiaDiemDi = diaDiemDi.substring(
        diaDiemDi.indexOf("(") + 1,
        diaDiemDi.lastIndexOf(")")
    );
    const formatDiaDiemDen = diaDiemDen.substring(
        diaDiemDen.indexOf("(") + 1,
        diaDiemDen.lastIndexOf(")")
    )

    const [flightInfo, setFlightInfo] = useState(null);
    const [partners, setPartners] = useState(null);

    const totalPeople = parseInt(flightSearchInfo.NguoiLon) + parseInt(flightSearchInfo.TreEm) + parseInt(flightSearchInfo.EmBe);

    useEffect(() => {
        axios.post(getFlightUrl, {
            DiaDiemDi: formatDiaDiemDi,
            DiaDiemDen: formatDiaDiemDen,
            NgayDi: flightSearchInfo.NgayDi
        })
            .then(response => {
                setFlightInfo(response.data[0]);
            })
    }, [getFlightUrl, flightSearchInfo.NgayDi, formatDiaDiemDen, formatDiaDiemDi]);

    useEffect(() => {
        axios.get(getPartnerUrl)
            .then(response => {
                setPartners(response.data);
            })
    }, [getPartnerUrl]);

    const handleRedirect = (flightInfo) => {
        localStorage.setItem("SUMMARY_INFO", JSON.stringify(flightInfo[0]));
    }

    return (
        <div style={{ "height": "900px" }}>
            <Header />
            <div class="search-header">
                <div class="center-search">
                    <div class="search-header-info">
                        <div class="search-location">
                            <b>{flightSearchInfo.DiaDiemDi} <img alt='...' src={East} /> {flightSearchInfo.DiaDiemDen}</b>
                        </div>
                        <div>{formatSearchNgayDi}  | {totalPeople} passengers  |  {flightSearchInfo.HangGhe}</div>
                    </div>
                    <div class="search-header-change">
                        <div>
                            <button><b><img alt='...' src={SearchIcon} width="18px" /> Đổi tìm kiếm</b></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-filter">
                <b>Bộ lọc:</b>
                <select>
                    <option>Điểm dừng</option>
                </select>
                <select>
                    <option>Thời gian bay</option>
                </select>
                <select>
                    <option>Hãng hàng không</option>
                </select>
            </div>
            {flightInfo && (flightInfo.map(function (flights) {
                var gioDi = format(new Date(flights.NgayGioKhoiHanh), 'yyyy/MM/dd hh:mm:ss');
                var gioDen = format(new Date(flights.NgayGioDen), 'yyyy/MM/dd hh:mm:ss');

                var day1 = new Date(gioDi);
                var day2 = new Date(gioDen);

                var difference = Math.abs(day2 - day1);
                var round = Math.floor(difference / (3600000));
                var spare = (difference % 3600000) / 60000;

                const vals = partners.filter(partner => partner.MaHangBay === flights.HangBay);
                // const seatClassVal = seatclass.filter(seat => seat.MaChuyenBay === flights.MaChuyenBay);
                // const giaVe = 0;

                // if(seatClassVal.length > 0){
                //     if(flightSearchInfo.HangGhe == "Phổ thông")
                //     giaVe = seatClassVal.PhoThong;
                // else if(flightSearchInfo.HangGhe == "Phổ thông đặc biệt")
                //     giaVe = seatClassVal.PhoThongDacBiet;
                // else if(flightSearchInfo.HangGhe == "Thương gia")
                //     giaVe = seatClassVal.ThuongGia;
                // else if(flightSearchInfo.HangGhe == "Hạng nhất")
                //     giaVe = seatClassVal.HangNhat;
                // }

                return (<div class="search-result">
                    <div class="search-result-item">
                        <div>
                            <div class="search-result-partner"><img alt='...' src={Vietjet} width="60px" /> <b>
                                {vals[0].TenHangBay}</b></div>
                            <div class="search-result-route">
                                <table>
                                    <tr>
                                        <td><b>{format(new Date(flights.NgayGioKhoiHanh), 'HH:mm')}</b></td>
                                        <td rowSpan={2} style={{ "color": "#7e858a" }}>
                                            <div>{round}h {spare}m</div>
                                            <div><img alt='...' src={Line} /></div>
                                            <div>Bay thẳng</div>
                                        </td>
                                        <td><b>{format(new Date(flights.NgayGioDen), 'HH:mm')}</b></td>
                                    </tr>
                                    <tr class="search-result-location">
                                        <td>
                                            <div>{flights.DiaDiemKhoiHanh}</div>
                                        </td>
                                        <td>
                                            <div>{flights.DiaDiemDen}</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="search-result-cost">
                                <div>
                                    <b><span class="search-highligh-btn">{flights.GiaVe.toLocaleString()}  VNĐ</span></b>
                                    <span style={{ "color": "#687176", "fontWeight": "550" }}>/khách</span>
                                </div>
                                <Link to={'/prebooking'} style={{ textDecoration: "none" }}>
                                    <div><button class="btnPickFlight" onClick={handleRedirect(flightInfo)}>Chọn</button></div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div class="btn-flight-detail">Chi tiết chuyến bay</div>
                            <div class="btn-ticket-detail">Chi tiết vé</div>
                        </div>
                    </div>
                </div>)
            }
            ))}
        </div>
    )
}

export default FlightSearchResult