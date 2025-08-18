import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Excel() {
  const [freightFile, setFreightFile] = useState(null);
  const [orderFile, setOrderFile] = useState(null);
  const [batchesFile, setBatchesFile] = useState(null);
  const [warehouseFile, setWarehouseFile] = useState(null);
  const [clientFile, setClientFile] = useState(null);
  const [sageinvoice, setSageinvoice] = useState(null);
  const [cashbook, setCashbook] = useState(null);
  const [loading, setLoading] = useState({
    freight: false,
    order: false,
    batches: false,
    warehouse: false,
    client: false,
    sageinvoice:false,
    cashbook:false,
  });
  const validateFile = (file) => {
    const allowedExtensions = ["xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }
  const handleFileChange = (file, setFile) => {
    if (file && validateFile(file)) {
      setFile(file);
    } else {
      toast.error("Invalid file type. Please upload an Excel file.");
    }
  };
  const handleUpload = (file, endpoint, fileType) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    setLoading((prev) => ({ ...prev, [fileType]: true }));
    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}${endpoint}`, formdata)
      .then((response) => {
        setLoading((prev) => ({ ...prev, [fileType]: false }));
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error("Upload failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading((prev) => ({ ...prev, [fileType]: false }));
        toast.error("An error occurred during upload.");
        console.error(error.response ? error.response.data : error);
      });
  };
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row manageFreight">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <h4 className="freight_hd">Upload Excel Files</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <div className="p-3">
              <div className="row align-items-center manageFreight">
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Freight Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setFreightFile)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(freightFile, "UploadExcelShipment", "freight")}
                      disabled={loading.freight}>
                      {loading.freight ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Order Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setOrderFile)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(orderFile, "UploadExcelShipmentOrder", "order")}
                      disabled={loading.order}
                    >
                      {loading.order ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="row align-items-center manageFreight">
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Batches Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setBatchesFile)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(batchesFile, "UploadExcelBatch", "batches")}
                      disabled={loading.batches}
                    >
                      {loading.batches ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Warehouse Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setWarehouseFile)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(warehouseFile, "UploadExcelWarehouse", "warehouse")}
                      disabled={loading.warehouse}
                    >
                      {loading.warehouse ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="row align-items-center manageFreight">
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Client Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setClientFile)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(clientFile, "upload-excel-client", "client")}
                      disabled={loading.client}
                    >
                      {loading.client ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Sage Invoice Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setSageinvoice)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(sageinvoice, "UploadSageInvoiceLlist", "sageinvoice")}
                      disabled={loading.client}
                    >
                      {loading.client ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="row align-items-center manageFreight">
                <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Cashbook Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setCashbook)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(cashbook, "UploadCashbookList", "cashbook")}
                      disabled={loading.cashbook}
                    >
                      {loading.cashbook ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div className="freight_excel">
                    <label>Sage Invoice Excel</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e.target.files[0], setSageinvoice)}
                    />
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleUpload(sageinvoice, "UploadSageInvoiceLlist", "sageinvoice")}
                      disabled={loading.client}
                    >
                      {loading.client ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div >
    </div >
  );
}
