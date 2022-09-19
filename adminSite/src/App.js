import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import List from "./pages/list/userList";
import Single from "./pages/single/Single";
import New from "./pages/users/New";
import NewVoucher from './pages/vouchers/New'
import UserEdit from "./pages/users/Edit";
import VoucherEdit from './pages/vouchers/Edit'
import VoucherList from "./pages/list/voucherList";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const isAuth = localStorage.getItem('isAuthentic') || false;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="flights">
              <Route index element={<List />} />
              <Route path=":flightId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Thêm Chuyến bay" />}
              />
              <Route
                path="edit"
                element={<UserEdit inputs={userInputs} title="Sửa thông tin chuyến bay" />}
              />
            </Route>
            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Thêm sản phẩm mới" />}
              />
            </Route> */}
            <Route path="vouchers">
              <Route index element={<VoucherList />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<NewVoucher />}
              />
              <Route
                path="edit"
                element={<VoucherEdit inputs={userInputs} title="Sửa Thông tin voucher" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
