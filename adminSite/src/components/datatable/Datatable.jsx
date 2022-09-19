import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import axios from 'axios'
import { axiosConfig } from "../../axiosConfig"
import { flightsColumns, voucherColumns, voucherRows } from "../../datatablesource"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = ({ objectName }) => {
  let dataRows = null;
  let dataColumns = null;
  let editAction = <div></div>;
  let addAction = <div></div>;
  const [flightsRows, setFlightsRows] = useState([]);

  const partnerJson = JSON.parse(localStorage.getItem("LOGIN_INFORMATION"));
  const url = `${axiosConfig.url}getPartnerFlights/${partnerJson.MaHangBay}`;
  useEffect(() => {
    axios.get(url)
      .then(response => {
        dataRows = response;
      })
  }, [url])

  if (objectName === 'Voucher') {
    dataRows = voucherRows;
    dataColumns = voucherColumns;
    editAction = <Link to="/vouchers/edit" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/vouchers/new" className="link">
      Thêm
    </Link>
  } else if (objectName === 'Chuyến bay') {
    dataRows = flightsRows;
    dataColumns = flightsColumns;
    editAction = <Link to="/users/test" style={{ textDecoration: "none" }}>
      <div className="viewButton">Xem</div>
    </Link>;
    addAction = <Link to="/users/new" className="link">
      Thêm
    </Link>
  } else if (objectName === 'Sản phẩm') {

  } else if (objectName === 'Đơn hàng') {

  }

  const [data, setData] = useState(dataRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));

    axios.delete(`${axiosConfig.url}getFlights/${id}`)
      .then(response => {
        window.location.reload();
      }).catch(err => console.log(err))
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {editAction}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Thêm mới {objectName}
        {addAction}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={dataColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
