import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import logo from "../../Assests/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function ShippingCalcclient() {
  const [error, setError] = useState({});
  const [update, setUpdate] = useState([0]);
  const [destation, setDestation] = useState([0]);
  const location = useLocation();
  const [freight, setFreight] = useState([0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [client, setClient] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const getdata = location?.state?.data[0];
  console.log(getdata);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };
  const handlechangecalc = (e) => {
    const { name, value } = e.target;
    setFreight((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };
  const num1 = parseFloat(freight.freight_amount || 0);
  const num2 = parseFloat(freight.freight_gp || 0);
  const num3 = num1 / (1 - num2 / 100);
  const finalval = isNaN(num3) ? 0 : num3.toFixed(2);
  const finalvalflo = parseFloat(finalval);
  const ori1 = parseFloat(freight.origin_pick_up || 0);
  const ori2 = parseFloat(freight.origin_pickup_gp || 0);
  const ori3 = ori1 / (1 - ori2 / 100);
  const finalori = isNaN(ori3) ? 0 : ori3.toFixed(2);
  ///////////////////origin coustomer////////////////////////////////////////////////////////
  const ori4 = parseFloat(freight.origin_customs || 0);
  const ori5 = parseFloat(freight.origin_customs_gp || 0);
  const ori6 = ori4 / (1 - ori5 / 100);
  const finalori2 = isNaN(ori6) ? 0 : ori6.toFixed(2);
  ///////////////////origin document////////////////////////////////////////////////////////
  const ori7 = parseFloat(freight.origin_document || 0);
  const ori8 = parseFloat(freight.origin_document_gp || 0);
  const ori9 = ori7 / (1 - ori8 / 100);
  const finalori3 = isNaN(ori9) ? 0 : ori9.toFixed(2);
  //////////////////////////////////////////////origin  waregouse///////////////////////////////////
  const ori11 = parseFloat(freight.origin_warehouse || 0);
  const ori12 = parseFloat(freight.origin_warehouse_gp || 0);
  const ori13 = ori11 / (1 - ori12 / 100);
  const final21 = isNaN(ori13) ? 0 : ori13.toFixed(2);
  //////////////////////////////////////origin /////////////////////////////////////////
  const ori21 = parseFloat(freight.origin_port_fees || 0);
  const ori22 = parseFloat(freight.origin_port_fees_gp || 0);
  const ori23 = ori21 / (1 - ori22 / 100);
  const finalori34 = isNaN(ori23) ? 0 : ori23.toFixed(2);
  ////////////////////////////origin other///////////////////////////////////////////////////////////////
  const ori31 = parseFloat(freight.origin_other || 0);
  const ori32 = parseFloat(freight.origin_other_gp || 0);
  const ori33 = ori31 / (1 - ori32 / 100);
  const finalori35 = isNaN(ori33) ? 0 : ori33.toFixed(2);
  const origintotal =
    parseFloat(finalori) +
    parseFloat(finalori2) +
    parseFloat(finalori3) +
    parseFloat(final21) +
    parseFloat(finalori34) +
    parseFloat(finalori35);
  const handlechangedestation = (e) => {
    const { name, value } = e.target;
    setDestation({ ...destation, [name]: value });
  };
  ////////////////////////////////////////////Destation warehouse///////////////////////////////////
  const ori41 = parseFloat(freight.des_warehouse || 0);
  const or42 = parseFloat(freight.des_warehouse_gp || 0);
  const or43 = ori41 / (1 - or42 / 100);
  const finaldestation = isNaN(or43) ? 0 : or43.toFixed(2);
  //////////////////////////////////////////////Destation  des_unpack/////////////////////////////////////
  const ori51 = parseFloat(freight.des_unpack || 0);
  const or52 = parseFloat(freight.des_unpack_gp || 0);
  const or53 = ori51 / (1 - or52 / 100);
  const finaldestation1 = isNaN(or53) ? 0 : or53.toFixed(2);
  /////////////////////////////////////////////destation
  const ori61 = parseFloat(freight.des_port_fees || 0);
  const or62 = parseFloat(freight.des_port_fees_gp || 0);
  const or63 = ori61 / (1 - or62 / 100);
  const finaldestation2 = isNaN(or63) ? 0 : or63.toFixed(2);
  ///////////////////////////////////////////////destation des_other ////////////////////////////////////////////
  const ori71 = parseFloat(freight.des_other || 0);
  const or72 = parseFloat(freight.des_other_gp || 0);
  const or73 = ori71 / (1 - or72 / 100);
  const finaldestation3 = isNaN(or73) ? 0 : or73.toFixed(2);
  ///////////////////////////////////////////////destation des_other ////////////////////////////////////////////
  const ori81 = parseFloat(freight.des_document || 0);
  const or82 = parseFloat(freight.des_document_gp || 0);
  const or83 = ori81 / (1 - or82 / 100);
  const finaldestation4 = isNaN(or83) ? 0 : or83.toFixed(2);
  /////////////////////////////////////////////destation delivery/////////////////////////////////////////////
  const ori91 = parseFloat(freight.des_delivery || 0);
  const or92 = parseFloat(freight.des_delivery_gp || 0);
  const or93 = ori91 / (1 - or92 / 100);
  const finaldestation5 = isNaN(or93) ? 0 : or93.toFixed(2);
  ////////////////////////////////////////////////destation /////////////////////////////////////////////
  const des1 = parseFloat(freight.des_customs || 0);
  const des2 = parseFloat(freight.des_customs_gp || 0);
  const des3 = des1 / (1 - des2 / 100);
  const finaldestation6 = isNaN(des3) ? 0 : des3.toFixed(2);
  const destationTotal =
    parseFloat(finaldestation) +
    parseFloat(finaldestation1) +
    parseFloat(finaldestation2) +
    parseFloat(finaldestation3) +
    parseFloat(finaldestation4) +
    parseFloat(finaldestation5) +
    parseFloat(finaldestation6);
  const overallCharge =
    parseFloat(finalvalflo) +
    parseFloat(origintotal) +
    parseFloat(destationTotal);
  // const estimate =
  //   finalvalflo * freight.Roefreight +
  //   origintotal * freight.roe_origin_currency +
  //   destationTotal * freight.roe_des_currency;
  // const finalestimate = isNaN(estimate) ? 0 : estimate.toFixed(2);
  const safeValue = (val) => (isNaN(val) ? 0 : val);

  const estimate =
    safeValue(finalvalflo) * safeValue(freight.Roefreight) +
    safeValue(origintotal) * safeValue(freight.roe_origin_currency) +
    safeValue(destationTotal) * safeValue(freight.roe_des_currency);
  
  const finalestimate = estimate.toFixed(2);

  const handleclick = () => {
    handlevalidate(update);
  };
  const handlevalidate2 = (value) => {
    let error = {};
    if (!value.supplier_id) {
      toast.error("select supplier is requied And update");
    } else {
      apihit();
    }
    setError(error);
  };
  const handlevalidate = (value) => {
    let error = {};
    if (!value.serial_number) {
      error.serial_number = "Serial Number is Required";
    }
    if (!value.date) {
      error.date = "Date is required";
    } else {
      handlevalidate2(freight);
    }
    setError(error);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const apihit = () => {
    console.log(getdata.client_id);
    const formdata = new FormData();
    formdata.append("freight_id", getdata.freight_id);
    formdata.append("client_id", getdata.client_id);
    formdata.append("client_name", getdata.client_name);
    formdata.append("serial_number", freight.serial_number);
    formdata.append("date", update.date);
    formdata.append("client_ref", getdata.client_ref);
    formdata.append("product_desc", getdata.product_desc);
    formdata.append("type", getdata.type);
    formdata.append("freight_gp", freight.freight_gp);
    formdata.append("freight", getdata.freight);
    formdata.append("incoterm", getdata.incoterm);
    formdata.append("dimension", getdata.dimension);
    formdata.append("weight", getdata.weight);
    formdata.append("freight_currency", freight.freight_currency);
    formdata.append("origin_currency", freight.origin_currency ?? "");
    formdata.append("des_currency", freight.des_currency ?? "");
    formdata.append("freight_amount", freight.freight_amount ?? "");
    formdata.append("origin_pick_up", freight.origin_pick_up ?? "");
    formdata.append("origin_pickup_gp", freight.origin_pickup_gp ?? "");
    formdata.append("origin_customs", freight.origin_customs ?? "");
    formdata.append("origin_customs_gp", freight.origin_customs_gp ?? "");
    formdata.append("origin_document", freight.origin_document ?? "");
    formdata.append("origin_document_gp", freight.origin_document_gp ?? "");
    formdata.append("origin_warehouse", freight.origin_warehouse ?? "");
    formdata.append("origin_warehouse_gp", freight.origin_warehouse_gp ?? "");
    formdata.append("origin_port_fees", freight.origin_port_fees ?? "");
    formdata.append("origin_port_fees_gp", freight.origin_port_fees_gp ?? "");
    formdata.append("origin_other", freight.origin_other ?? "");
    formdata.append("origin_other_gp", freight.origin_other_gp ?? "");
    formdata.append("supplier_id", freight.supplier_id);
    formdata.append("des_delivery", freight.des_delivery ?? "");
    formdata.append("roe_des_currency", freight.roe_des_currency ?? "");
    formdata.append("des_delivery_gp", freight.des_delivery_gp ?? "");
    formdata.append("Roefreight", freight.Roefreight ?? "");
    formdata.append("des_customs", freight.des_customs ?? "");
    formdata.append("des_customs_gp", freight.des_customs_gp ?? "");
    formdata.append("des_document", freight.des_document ?? "");
    formdata.append("des_document_gp", freight.des_document_gp ?? "");
    formdata.append("des_warehouse", freight.des_warehouse ?? "");
    formdata.append("des_warehouse_gp", freight.des_warehouse_gp ?? "");
    formdata.append("des_port_fees", freight.des_port_fees ?? "");
    formdata.append("des_port_fees_gp", freight.des_port_fees_gp ?? "");
    formdata.append("des_unpack", freight.des_unpack ?? "");
    formdata.append("roe_origin_currency", freight.roe_origin_currency ?? "");
    formdata.append("des_unpack_gp", freight.des_unpack_gp ?? "");
    formdata.append("des_other", freight.des_other ?? "");
    formdata.append("des_other_gp", freight.des_other_gp ?? "");
    formdata.append("freigh_amount", finalvalflo);
    formdata.append("origin_amount", origintotal);
    formdata.append("des_amount", destationTotal);
    formdata.append("sub_amount", overallCharge);
    formdata.append("exchange_rate", freight.exchange_rate ?? "");
    formdata.append("total_amount", finalestimate);
    formdata.append("freight_agent", "tushar");
    formdata.append("Supplier_Quote_Amount", freight.Supplier_Quote_Amount);
    formdata.append("Supplier_Quote_Attachment", selectedFile);
    formdata.append("final_base_currency", freight.final_base_currency);
    formdata.append(
      "freight_final_amount",
      isNaN(finalvalflo * freight.exchange_rate)
        ? 0
        : parseFloat(finalvalflo * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_pick_final_amt",
      isNaN(finalori * freight.exchange_rate)
        ? 0
        : parseFloat(finalori * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_cust_final_amt",
      isNaN(finalori2 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori2 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_doc_final_amt",
      isNaN(finalori3 * freight.exchange_rate)           
        ? 0
        : parseFloat(finalori3 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_ware_final_amt",
      isNaN(final21 * freight.exchange_rate)
        ? 0
        : parseFloat(final21 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "org_port_fee_final_amt",
      isNaN(finalori34 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori34 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "org_other_final_amt",
      isNaN(finalori35 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori35 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_delivery_final_amt",
      isNaN(finaldestation5 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation5 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_cust_final_amt",
      isNaN(finaldestation6 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation6 * freight.exchange_rate).toFixed(2)
    );

    formdata.append(
      "des_doc_final_amt",
      isNaN(finaldestation4 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation4 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_ware_final_amt",
      isNaN(finaldestation * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_portfees_final_amt",
      isNaN(finaldestation1 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation1 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_unpack_final_amt",
      isNaN(finaldestation1 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation1 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_other_final_amt",
      isNaN(finaldestation3 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation3 * freight.exchange_rate).toFixed(2)
    );
    console.log(formdata);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}shipping_estimate`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        if (response.data.success === true) {
          navigate("/Admin/freight");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const supplier = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-suppler-selected`, {
        freight_id: getdata.id,
      })
      .then((response) => {
        console.log(response);
        setClient(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  useEffect(() => {
    supplier();
  }, []);
  const handlepresss = (e) => {
    if (e.charCode < 42 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const dateformate = new Date(getdata?.date).toLocaleDateString("en-GB");
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    getdataapi();
  }, [500]);
  const getdataapi = async () => {
    const data123 = {
      estimate_id: getdata.estimated_id,
    };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}get-shipestimate`, data123)
      .then((response) => {
        console.log(response.data.data);
        setFreight(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleclicknav = () => {
    navigate("/Admin/freight");
  };
  return (
    <>
      <div className="wpWrapper ">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd ms-3">Supplier Form</h4>
                      </div>
                    </div>
                    <MdDownloadForOffline
                      onClick={() => toPDF()}
                      className="fs-2"
                      style={{ color: "#1b2245" }}
                    />
                  </div>
                </div>
              </div>
              <section
                style={{ marginTop: "10px", padding: "30px" }}
                ref={targetRef}
              >
                <div
                  style={{
                    height: "auto",
                    width: "100%",
                    border: "1px solid black",
                    padding: 20,
                    outline: "auto",
                  }}
                >
                  <p>
                    <table style={{ margin: "20px" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <div>
                              <img
                                style={{ height: 55 }}
                                src={logo}
                                alt="hellow"
                              />
                            </div>
                          </td>
                          <td style={{ width: "50%", color: "#000" }}>
                            <p
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                marginBottom: "unset",
                                borderBottom: "1px solid #cb191e",
                                display: "inline-block",
                                paddingBottom: 5,
                              }}
                            >
                              Asia Direct - Africa
                            </p>
                            <p
                              style={{
                                fontSize: 15,
                                fontWeight: 500,
                                marginBottom: "unset",
                                lineHeight: "1.5",
                                marginTop: 10,
                              }}
                            >
                              Asia Direct, Unit 4 Villa Valencia 2 Anemoon Road
                              Glen Marais 1619 South Africa Mauritania
                              www.asiaDirect.africa
                            </p>
                            <p>
                              <span>VAT Number: 4740280377</span>
                              <br />
                              TEL: +27 10 448 0733
                            </p>
                            <p> </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ paddingTop: "20px", marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{ fontSize: 15, textTransform: "lowercase" }}
                          >
                            {/* PO Box 16600 ATLASVILLE */}
                            {/* VAT Number: 4740280377 */}
                          </td>
                          <td
                            style={{
                              fontSize: 15,
                              padding: "0px 20px",
                              textTransform: "lowercase",
                            }}
                          >
                            {/* TEL: +27 10 448 0733 */}
                          </td>
                          <td
                            style={{ fontSize: 15, textTransform: "lowercase" }}
                          >
                            {/* TEL: ++27-11-820 8000 WWW.SACOCFR.CO.ZA */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        padding: "10px 20px",
                        width: "100%",
                        marginTop: 20,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: 600,
                              width: "100%",
                            }}
                          >
                            FREIGHT ESTIMATE
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        borderTop: "unset",
                        width: "100%",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              borderRight: "2px solid #1a2142",
                              height: "100%",
                            }}
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 15,
                                      padding: "0px 10px",
                                    }}
                                  >
                                    <strong>
                                      {getdata.client_name}
                                      <br />
                                      {getdata.address_1}
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Shipment Details ISO Commodity
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  {}
                                  <td style={{ padding: "0px 10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.no_of_packages}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>dimension</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.dimension}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Weight</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.weight}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.no_of_packages}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Rate of Exchange
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Final Base Currency</strong>
                                      </p>
                                      <select
                                        className="select_supplier border"
                                        style={{
                                          margin: 0,
                                          fontSize: 13,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                          width: "25%",
                                          border: "2px",
                                        }}
                                        onChange={handlechangecalc}
                                        name="final_base_currency"
                                        value={freight?.final_base_currency}
                                      >
                                        <option>Select...</option>
                                        <option value="RAND">RAND</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                        <option value="EURO">EURO</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td style={{ width: "50%", paddingTop: 10 }}>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      width: 170,
                                      display: "block",
                                      padding: "0px 10px 10px 10px",
                                      fontSize: 15,
                                    }}
                                  >
                                  </td>
                                  <td
                                    style={{ paddingBottom: 10, fontSize: 15 }}
                                  >
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "0px 10px 10px 10px",
                                      width: 170,
                                      display: "block",
                                      paddingBottom: 10,
                                      fontSize: 15,
                                    }}
                                  >
                                    <strong>Quote Date</strong>
                                  </td>
                                  <td
                                    style={{
                                      paddingBottom: 15,
                                      fontSize: 15,
                                      padding: "0px 10px 10px 10px",
                                    }}
                                  >
                                    {new Date(
                                      getdata?.created_at
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Shipment Details
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td style={{ padding: "0px 10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Country of Origin</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata.collection_from_country}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Deliver to Country</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata.delivery_to_country}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Loading</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.port_of_loading}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Discharge</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.post_of_discharge}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Place of Delivery</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.delivery_address}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "31%",
                              borderBottom: "0px solid transparent",
                              height: 22,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: 5,
                              }}
                            >
                              QUOTE INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Items
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "31%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Description
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                onChange={handlechangecalc}
                                name="freight_currency"
                                value={freight?.freight_currency}
                              >
                                <option>Select</option>
                                <option value="RAND">RAND</option>
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EURO">EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Cost
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                GP
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                ROE
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Amount({freight.freight_currency})
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Final Amount
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {getdata.freight} Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="USD"
                                value={freight.freight_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                class=" supplier_form"
                                name="freight_amount"
                                value={freight?.freight_amount}
                                onChange={handlechangecalc}
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                name="freight_gp"
                                onChange={handlechangecalc}
                                value={freight?.freight_gp}
                                id="floatingInput"
                                placeholder="0.00%"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                name="Roefreight"
                                value={freight.Roefreight}
                                onChange={handlechangecalc}
                                id="floatingInput"
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={finalvalflo}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={
                                  isNaN(finalvalflo * freight.Roefreight)
                                    ? 0
                                    : parseFloat(
                                        finalvalflo * freight.Roefreight
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Total for Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={
                                  isNaN(finalvalflo * freight.Roefreight)
                                    ? 0
                                    : parseFloat(
                                        finalvalflo * freight.Roefreight
                                      ).toFixed(2)
                                }
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                value={freight?.origin_currency}
                                onChange={handlechangecalc}
                                name="origin_currency"
                              >
                                <option>Select</option>
                                <option value="RAND">RAND</option>
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EURO">EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                value={freight.roe_origin_currency}
                                onChange={handlechangecalc}
                                name="roe_origin_currency"
                                id="floatingInput"
                                placeholder="0.00"
                              ></input>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Pick-up
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_pick_up}
                                name="origin_pick_up"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_pickup_gp}
                                name="origin_pickup_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                                value={freight.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                                placeholder="0.00"
                                value={finalori}
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(finalori * freight.roe_origin_currency)
                                    ? 0
                                    : parseFloat(
                                        finalori * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Customs
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                name="origin_customs"
                                value={freight?.origin_customs}
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_customs_gp}
                                name="origin_customs_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                                value={freight?.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={finalori2}
                                placeholder="0.00"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(finalori2 * freight.roe_origin_currency)
                                    ? 0
                                    : parseFloat(
                                        finalori2 * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Document
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_document}
                                name="origin_document"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_document_gp}
                                name="origin_document_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                                value={freight?.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finalori3}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(finalori3 * freight.roe_origin_currency)
                                    ? 0
                                    : parseFloat(
                                        finalori3 * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Warehouse
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                value={freight?.origin_warehouse}
                                onChange={handlechangecalc}
                                name="origin_warehouse"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight?.origin_warehouse_gp}
                                name="origin_warehouse_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                                value={freight?.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={final21}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(final21 * freight.roe_origin_currency)
                                    ? 0
                                    : parseFloat(
                                        final21 * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Port Fees{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                onChange={handlechangecalc}
                                value={freight?.origin_port_fees}
                                name="origin_port_fees"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                onChange={handlechangecalc}
                                value={freight?.origin_port_fees_gp}
                                name="origin_port_fees_gp"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight?.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finalori34}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finalori34 * freight.roe_origin_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finalori34 * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Other
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.origin_currency}
                                className="freight_currency"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                onChange={handlechangecalc}
                                value={freight.origin_other}
                                name="origin_other"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                value={freight.origin_other_gp}
                                onChange={handlechangecalc}
                                name="origin_other_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight.roe_origin_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finalori35}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finalori35 * freight.roe_origin_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finalori35 * freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Total for Origin Charges{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={parseFloat(origintotal).toFixed(2)}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={
                                  isNaN(
                                    origintotal * freight.roe_origin_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        origintotal *
                                          freight.roe_origin_currency
                                      ).toFixed(2)
                                }
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                onChange={handlechangecalc}
                                value={freight.des_currency}
                                name="des_currency"
                              >
                                <option>Select</option>
                                <option value="RAND">RAND</option>
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EURO">EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                                name="roe_des_currency"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                value={freight.roe_des_currency}
                                onChange={handlechangecalc}
                                id="floatingInput"
                                placeholder="0.00"
                              ></input>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Delivery{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                onChange={handlechangecalc}
                                value={freight.des_delivery}
                                name="des_delivery"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                value={freight.des_delivery_gp}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                name="des_delivery_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                value={freight.roe_des_currency}
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={finaldestation5}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation5 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation5 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Customs
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                onChange={handlechangecalc}
                                name="des_customs"
                                value={freight.des_customs}
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form "
                                value={freight.des_customs_gp}
                                onChange={handlechangecalc}
                                name="des_customs_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form "
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finaldestation6}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation6 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation6 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Document
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight.des_document}
                                name="des_document"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight.des_document_gp}
                                name="des_document_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finaldestation4}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation4 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation4 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Warehouse
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form "
                                value={freight.des_warehouse}
                                onChange={handlechangecalc}
                                name="des_warehouse"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight.des_warehouse_gp}
                                name="des_warehouse_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finaldestation}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Port Fees{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                value={freight.des_port_fees}
                                onChange={handlechangecalc}
                                name="des_port_fees"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                value={freight.des_port_fees_gp}
                                onChange={handlechangecalc}
                                name="des_port_fees_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                              value={finaldestation2}
                              placeholder="0.00"
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation2 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation2 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Unpack
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form "
                                value={freight.des_unpack}
                                onChange={handlechangecalc}
                                name="des_unpack"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                name="des_unpack_gp"
                                value={freight.des_unpack_gp}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finaldestation1}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation1 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation1 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Other
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form"
                                onChange={handlechangecalc}
                                value={freight.des_other}
                                name="des_other"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                onKeyPress={handlepresss}
                                className="supplier_form "
                                onChange={handlechangecalc}
                                value={freight.des_other_gp}
                                name="des_other_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form "
                                value={freight.roe_des_currency}
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={finaldestation3}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                value={
                                  isNaN(
                                    finaldestation3 * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        finaldestation3 *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                Total for Destination Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={destationTotal.toFixed(2)}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={
                                  isNaN(
                                    destationTotal * freight.roe_des_currency
                                  )
                                    ? 0
                                    : parseFloat(
                                        destationTotal *
                                          freight.roe_des_currency
                                      ).toFixed(2)
                                }
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                borderTop: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={overallCharge.toFixed(2)}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  height: "14px",
                                  verticalAlign: "middle",
                                }}
                                value={
                                  isNaN(estimate) ? 0 : estimate.toFixed(2)
                                }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <button className="get_quote" onClick={apihit}>
                      Get Quote
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
