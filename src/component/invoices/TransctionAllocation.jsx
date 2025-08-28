import React, { useEffect, useState } from "react";
import Topbar from "../Topbar";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";
import axios from "axios";
import logo from "../../Assests/logo.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const pageSize = 10;
export default function TransctionAllocation() {
  const [value, setValue] = React.useState(dayjs());

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    const user = JSON.parse(localStorage.getItem("data"));
    console.log(user);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}TransactionAllocation`, {
        user_id: user.id,
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setData(response.data.data); // <-- table rows
      })
      .catch((error) => {
        console.log(error.response?.data?.message || error.message);
      });
  };

  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Topbar />
      <Navbar />

      <div className="container">
        <div className=" mt-4 d-flex justify-content-between">
          <div className="fw-bold fs-3">Statement</div>
          <div className="searchInput">
            <input className="rounded" placeholder="Search..."></input>
          </div>
        </div>
        <div className="statementHead">
          <div>
            <p>Ruvako Mabureki</p>
            {/* <h5>Statement of Accounts</h5> */}
          </div>
          <div className="logoState">
            <img src={logo} alt="" />
          </div>
        </div>
        <p className="fw-bold">Full Account History : </p>
        <div className="d-flex justify-content-between">
          <div>
            <label className=" mb-2">Select Month</label>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  placeholder="Select Month"
                  views={["year", "month"]}
                  openTo="month"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3 accSumary">
          <p className="fw-bold">Account Summary :</p>
          <p>
            <strong>Outstanding Balance</strong> : <span> R 0.00</span>
          </p>
        </div>
        <div className="table-responsive">
          <table className="table table-striped tableICon">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentdata &&
                currentdata.length > 0 &&
                currentdata.map((item, index) => {
                  console.log(item);
                  return (
                    <>
                      <tr key={item.id}>
                        <td>
                          {new Date(item.date).toLocaleDateString("EN-gb")}
                        </td>
                        <td>{item.description}</td>
                        <td>{item.Debit}</td>

                        <td>{item.Credit}</td>
                        <td>{item.balance}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="accSumary">
            <p>
              Ensure your CPD is logged, Annual Declarations are submitted, and
              your compliance status is in good standing.
            </p>
            <h6 className="fw-bold">Banking Details :</h6>
            <div className="d-flex">
              <p className="me-4">
                <strong>Account Holder: </strong> <span>CIBA</span>
              </p>
              <p>
                <strong>Bank: </strong> <span>Absa Bank</span>
              </p>
            </div>
          </div>

          <div className="text-center d-flex justify-content-end align-items-center">
            <button
              disabled={currentPage === 1}
              className="bg_page"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i class="fi fi-rr-angle-small-left page_icon"></i>
            </button>
            <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
            <button
              disabled={currentPage === totalPage}
              className="bg_page"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i class="fi fi-rr-angle-small-right page_icon"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
