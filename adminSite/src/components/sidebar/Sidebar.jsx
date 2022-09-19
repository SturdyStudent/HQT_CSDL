import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiscountIcon from '@mui/icons-material/Discount';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlightIcon from '@mui/icons-material/Flight';
import Logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="..." height="60" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">CHÍNH</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">DANH SÁCH</p>
          <Link to="/flights" style={{ textDecoration: "none" }}>
            <li>
              <FlightIcon className="icon" />
              <span>Chuyến bay</span>
            </li>
          </Link>
          <Link to="/vouchers" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Vouchers</span>
            </li>
          </Link>
          <li>
            <WorkIcon className="icon" />
            <span>Hành lí xách tay</span>
          </li>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Thông tin cá nhân</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
