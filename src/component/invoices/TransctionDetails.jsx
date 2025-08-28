import React, { useEffect, useState } from "react";
import Topbar from "../Topbar";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";
import axios from "axios";
const pageSize = 10;
export default function TransctionDetails() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    const userid = JSON.parse(localStorage?.getItem("data"));
    console.log( localStorage.getItem( "pratima", "data"));
    axios
      .post(`${process.env.REACT_APP_BASE_URL}GetClientAllInvoice`, {
        client_id: userid.id,
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
      <div className="d-flex justify-content-between mx-5 my-4">
        <div className="fw-bold fs-3">Statement</div>
        <div className="searchInput">
          <input className="rounded" placeholder="Search..."></input>
        </div>
      </div>
      <div className="table-responsive mt-4 mx-5">
        <table className="table table-striped tableICon">
          <thead>
            <tr>
              <th>Invoice Date </th>
              <th>Freight Number</th>
              <th>Document Number</th>
              <th>Txn Type</th>
              <th>Bill Currency</th>
              <th>Bal Amt</th>
              <th>Payment Rec</th>
              <th>TXN Amt</th>
              <th>Due Date</th>
              <th>Day Past Due</th>
              <th>Dispute</th>
              <th>Dispute ID</th>
              <th>Dispute Status</th>
              <th>Text</th>
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
                      <td>{item.document_number}</td>
                      <td>{item.freight_number}</td>
                      <td>{item.document_number}</td>
                      <td>{new Date(item.date).toLocaleDateString("EN-gb")}</td>
                      <td>{item.total}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
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
      <Footer />
    </div>
  );
}
