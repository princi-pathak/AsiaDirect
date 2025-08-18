// import React from 'react'
// import Topbar from '../Topbar'
// import Navbar from '../homepage/Navbar'
// import Footer from '../homepage/Footer'

// export default function Custompdf() {
//   return (
//     <div>
//      <Topbar />
//      <Navbar />

//      <Footer />
//     </div>
//   )
// }
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { MdDownloadForOffline } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import logo from "../../assestss/logo.png"
import { usePDF } from 'react-to-pdf';
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
export default function Custompdf() {
  const [details, setDetails] = useState([])
  const [calculation1, setCalculation1] = useState('')
  const [calculation2, setCalculation2] = useState('')
  const [calculation3, setCalculation3] = useState('')
  const [extrachange, setExtrachange] = useState('')
  const location = useLocation()
  const [wuotedrate, setWuotedrate] = useState('')
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const getdatallestimate = (location?.state?.data[0])
  console.log(getdatallestimate)

  const getdatainthispage = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}get-calculated-details`, { clearance_id: getdatallestimate.id }).then((response) => {
      console.log(response.data.data)
      setDetails(response.data.data)
      console.log(response.data.data[0].quoted_rate)
      setWuotedrate(response.data.data[0].quoted_rate)
      setCalculation1(response.data.data[0]?.total_amount)
      setCalculation2(response.data.data[1]?.total_amount)
      setCalculation3(response.data.data[2]?.total_amount)
      setExtrachange(response.data.data[0]?.final_amount)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
  console.log(calculation2)
  console.log(calculation3)
  useEffect(() => {
    getdatainthispage()
  }, [])
  const totalcalcualtion = (calculation1 ? calculation1 : 0) + (calculation2 ? calculation2 : 0) + (calculation3 ? calculation3 : 0) + (extrachange ? extrachange : 0)
  return (

    <div>
      <Topbar />
      <Navbar />
      <div className="container mb-5" >
        <div className="row mt-3 mx-2 shadow">
          <div className="col rounded p-2 frightBgTop d-flex justify-content-between">
            <div>
              <p className='m-0 fw-bold ' style={{ color: "#fff" }} >Estimate</p>
            </div>
            <div className="fa fa-download  fs-3 " onClick={() => toPDF()} style={{ color: "#fff" }} >

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="px-5 mt-4" ref={targetRef} style={{ background: "#cfd0d71c" }} >
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table style={{ margin: "20px" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: "50%" }}>
                              <div>
                                <img style={{ height: 55 }} src={logo} alt="hellow" />
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
                                  paddingBottom: 5
                                }}
                              >
                                ASIA DIRECT
                              </p>
                              <p
                                style={{
                                  fontSize: 15,
                                  fontWeight: 500,
                                  marginBottom: "unset",
                                  lineHeight: "1.5",
                                  marginTop: 10
                                }}
                              >
                                R.C 102069/GU/23078/342 N.I.F. 00619049 Lot 1644 Ext F nord
                                Secteur 06, Tevragh Zeina Nouakchott , Mauritania
                                www.asiaDirect.com
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ paddingTop: "20px", marginTop: "20px", }}>
                        <tbody>
                          <tr>
                            <td style={{ fontSize: 15, textTransform: "lowercase" }}>
                              PO Box 16600 ATLASVILLE
                            </td>
                            <td
                              style={{
                                fontSize: 15,
                                padding: "0px 20px",
                                textTransform: "lowercase"
                              }}
                            >
                              41 Yaldwyn Road Corner Yaldwyn And Tudor Road Jet Park
                            </td>
                            <td style={{ fontSize: 15, textTransform: "lowercase" }}>
                              TEL: ++27-11-820 8000 WWW.SACOCFR.CO.ZA
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          border: "2px solid #1b2245",
                          padding: "10px 20px",
                          width: "100%",
                          marginTop: 20
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 15,
                                fontWeight: 600,
                                width: "100%"
                              }}
                            >
                              OCEANFREIGHT IMPORTS ESTIMATE for FOB General commodity cargo
                              only
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ border: "2px solid #1b2245", borderTop: "unset", width: "100%", }}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                width: "50%",
                                borderRight: "2px solid #1a2142",
                                height: "100%"
                              }}
                            >
                              <table>
                                <tbody>
                                  <tr>
                                    <td style={{ fontSize: 15, padding: "0px 10px" }}>
                                      <strong>DANCLIFF GLOBAL (PTY) LTD t/a DANCIFF LOGISTICS</strong>
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
                                  padding: 2
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
                                    <td style={{ padding: "0px 10px" }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10,

                                          }}
                                        >
                                          <strong>Customer Ref</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.customer_ref}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong>Destination</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.destination}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong>Goods Desc</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.goods_desc}
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
                                  padding: 2
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ fontSize: 15 }}>Rate of Exchange</td>
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
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong>Rate of Exchange</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <p>{wuotedrate}</p>
                                        </p>
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
                                        fontSize: 15
                                      }}
                                    >
                                      <strong>Clearance Number</strong>
                                    </td>
                                    <td style={{ paddingBottom: 10, fontSize: 15 }}>
                                      {getdatallestimate.clearance_number}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        padding: "0px 10px 10px 10px",
                                        width: 170,
                                        display: "block",
                                        paddingBottom: 10,
                                        fontSize: 15
                                      }}
                                    >
                                      <strong>Clearing Status</strong>
                                    </td>
                                    <td style={{
                                      paddingBottom: 15, fontSize: 15,
                                      padding: "0px 0px 0px 0px",
                                    }}>
                                      {getdatallestimate.clearing_status}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        padding: "0px 10px 10px 10px",
                                        width: 170,
                                        display: "block",
                                        paddingBottom: 10,
                                        fontSize: 15
                                      }}
                                    >
                                      <strong>Comment On Docs</strong>
                                    </td>
                                    <td style={{ paddingBottom: 15, fontSize: 15 }}>
                                      {getdatallestimate.comment_on_docs}
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
                                  padding: 2
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ fontSize: 15 }}>Shipment Details</td>
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
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong>  Goods Desc</strong>

                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.goods_desc}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong> Port Of Entry</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.port_of_entry_name}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between"
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          <strong>Port Of Exit</strong>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 15,
                                            marginBottom: "unset",
                                            marginTop: 10
                                          }}
                                        >
                                          {getdatallestimate.port_of_exit_name}
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
                      <table
                        style={{
                          border: "2px solid #1a2142",
                          width: "100%",
                          marginTop: 10,
                          borderBottom: "unset",
                          background: "#1b2245",
                        }}
                      >
                        <tbody>
                          <tr
                            style={{
                              display: "inline-block",
                              color: "#1a2142",
                              padding: "1px 14px",
                              marginLeft: 0
                            }}
                          >
                            <td>
                              {" "}
                              <span
                                style={{ paddingRight: 20, fontSize: 15, fontWeight: 600, color: "#fff" }}
                              >
                                {" "}
                                QUOTE INFORMATION
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="table-border"
                        style={{ width: "100%", marginTop: 0 }}
                      >
                        <tbody>
                          <tr style={{ textAlign: "left" }}>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15,
                                width: 150
                              }}
                            >
                              {" "}
                              HS codes{" "}
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15,
                                width: 200
                              }}
                            >
                              HS Description
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15,
                                width: 200
                              }}
                            >
                              Goods Value
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15,
                                width: 200
                              }}
                            >
                              Import Duty
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15,
                                width: 200
                              }}
                            >
                              Import Duty (%)
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                              Values of Good
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                              Vat
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                              Vat (%)
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                              Final Amount
                            </th>
                          </tr>
                          {
                            details && details.length > 0 && details.map((item, index) => {

                              return (
                                <>
                                  <tr>
                                    <th
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        textAlign: "left",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.HS_tariff_code}
                                    </th>
                                    <td style={{ padding: 5, border: "1px solid #1a2142" }}>
                                      {item.HS_description}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.goods_value}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.import_duty}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.import_duty_per}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.values_of_good}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.vat}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.vat_per}
                                    </td>
                                    <td
                                      style={{
                                        padding: 5,
                                        border: "1px solid #1a2142",
                                        fontSize: 15
                                      }}
                                    >
                                      {item.total_amount}
                                    </td>
                                  </tr>
                                </>
                              )
                            })
                          }
                          {/* <tr>
                                      <th
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              textAlign: "left",
                                              fontSize: 15
                                          }}
                                      >
                                          
                                      </th>
                                      <td style={{ padding: 5, border: "1px solid #1a2142" }}>
                                          {getdatallestimate.freight}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freight_currency}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freight_amount}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freight_gp}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freightt_amount}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freightt_amount}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freightt_amount}
                                      </td>
                                      <td
                                          style={{
                                              padding: 5,
                                              border: "1px solid #1a2142",
                                              fontSize: 15
                                          }}
                                      >
                                          {getdatallestimate.freightt_amount}
                                      </td>
                                    
                                      
                                  </tr> */}
                          <tr>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </td>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >

                            </th>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                             Extra Charge
                            </td>
                            
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                              </td>

                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                               {extrachange ? extrachange : 0}
                            </td>
                            
                           
                            {/* <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th>
                            <th
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                fontSize: 15
                              }}
                            >
                            </th> */}
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td>

                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >

                            </td>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "#000"
                              }}
                            >
                              Total Charge
                            </td>
                            
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td>

                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td>
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td>

                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                              
                            </td>  
                            <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "#000"
                              }}
                            >
                              {totalcalcualtion}
                            </td> 
                            
                            {/* <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td> */}
                            {/* <td
                              style={{
                                padding: 5,
                                border: "1px solid #1a2142",
                                color: "white"
                              }}
                            >
                            </td> */}
                          </tr>
                          {/* <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Charges
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Pickup
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_pick_up}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_pickup_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Custom
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>

                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_customs}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_customs_gp}

                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Document
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_document}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_document_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Warehouse
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_warehouse}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_warehouse_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Port Fees
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_port_fees}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_port_fees_gp}

                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Origin Other
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_other}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_other_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Total for Origin Charges
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />

                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_amount}
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.origin_amount_gp}
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 10,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        color: "white"
                                                    }}
                                                >
                                                    -----
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        textAlign: "left",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destination Charges
                                                </th>
                                                <td style={{ padding: 5, border: "1px solid #1a2142" }}>
                                                    Destation Delivery
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_delivery}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_delivery_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation Customs
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_customs}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_customs_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation Documents
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_document}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_document_gp}

                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation Warehouse
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_warehouse}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_warehouse_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation port fees
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_port_fees}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_port_fees_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation Unpack
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_unpack}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_unpack_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Destation Other
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_currency}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_other}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_other_gp}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Total for Destation Charges
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.des_amount}
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    Overall Estimate
                                                </th>
                                                <td
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                />
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.sub_amount}
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                </th>
                                                <th
                                                    style={{
                                                        padding: 5,
                                                        border: "1px solid #1a2142",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {getdatallestimate.total_amount}
                                                </th>
                                            </tr> */}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
