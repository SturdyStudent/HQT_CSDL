import "./new.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Switch from 'react-switch'

const Edit = ({ title }) => {
    const [active, setActive] = useState(true);
    const activeText = active ? 'Đã kích hoạt' : 'Đã bị vô hiệu';
    const isPercentageDiscount = false;
    const handleActive = () => {
        setActive(!active);
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <form style={{ "display": "flex", "justifyContent": "center" }}>
                    <div className="flex-column offset-3 col-md-6 bottom row">
                        <div className="CpnInp-code mt-3" >
                            <label><b>Mã Coupon</b></label><br />
                            <input className="col-md-12 mb-3" style={{ "border": "2px solid #D3D3D3" }}></input>
                        </div>
                        <div className="CpnInp-code mb-3">
                            <label><b>Mô tả</b></label><br />
                            <input className="col-md-12" style={{ "border": "2px solid #D3D3D3" }}></input>
                        </div>
                        <div className="pt-2 pb-2 d-flex justify-content-left align-items-center">
                            <div><Switch onChange={handleActive} checked={active} /></div>
                            <div className="ms-3"><b>{activeText}</b></div>
                        </div>
                        <div className="CpnInp-code mb-3">
                            <select class="custom-select p-2" style={{ "border": "2px solid #D3D3D3" }}>
                                <option selected>Giảm giá theo phần trăm</option>
                                <option value="1">Giảm giá theo giá tiền</option>
                            </select>
                        </div>
                        <div className="CpnInp-code mb-3">
                            <label><b>Gía trị Voucher</b></label><br />
                            <div class="input-group mb-3 mt-2">
                                <input type="text" class="form-control" placeholder="Gía trị.." aria-label="Username" aria-describedby="basic-addon1" />
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{isPercentageDiscount ? '%' : 'vnđ'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="CpnInp-code mb-3">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" style={{ "border": "2px solid #D3D3D3", width: "20px", height: "20px" }} /> &nbsp; Có Free ship
                            </label>
                        </div>
                        <div><b>Voucher có giá trị trong khoảng</b></div>
                        <div className="CpnInp-code mb-3 mt-3 d-flex">
                            <div>
                                <label for="activeDatePicker">Ngày kích hoạt:</label> &nbsp;
                                <input type="date" className="p-1" id="activeDatePicker" name="birthday" />
                            </div>
                            <div className="ms-3">
                                <label for="expireDatePicker">Ngày hết hạn:</label> &nbsp;
                                <input type="date" className="p-1" id="expireDatePicker" name="birthday" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2 mb-3">
                            <button type="button" className="btn btn-primary col-md-6 ">Hoàn Tất</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
