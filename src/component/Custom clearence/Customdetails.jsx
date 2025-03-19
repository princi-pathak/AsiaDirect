// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import Topbar from '../Topbar'
// import Navbar from '../homepage/Navbar'
// import Footer from '../homepage/Footer'

// export default function Customdetails() {
//     const location = useLocation()
//     const cleardata = (location?.state?.data)
//     console.log(location?.state?.data)
//   return(
//     <>
// <Topbar />
// <Navbar />
//     <div>
//      <section className="formDetails">
//   <div className="container">
//     <div className="row">
//       <div className="col-lg-12">
//         <h4 className="empyDetailHead">Custom Clearance Details</h4>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label htmlFor="">Clearing Result</label>
//         <input className="form-control" value={cleardata?.clearing_result} placeholder={1} readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Clearing Agent</label>
//         <input className="form-control" value={cleardata.clearing_agent} placeholder="allen james" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Client</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="xyz"
//           readOnly=""
//           value={cleardata.client}
//         />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>
//             Comment On Doccument</label>
//         <input placeholder="12/3/12" value={cleardata?.comment_on_docs} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label>Customer Refrence</label>
//         <input placeholder="LCL"  value={cleardata?.customer_ref}   className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Destination</label>
//         <input placeholder="sea" value={cleardata.destination} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Document Required</label>
//         <input placeholder="DDP" value={cleardata?.document_req} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Goods Desc</label>
//         <input placeholder={5} value={cleardata.goods_desc} className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="horizontalLine"></div>
//     <div className="row">
//       <div className="col">
//         <label>port_of_entry</label>
//         <input placeholder={5} value={cleardata.port_of_entry} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label>port_of_exit </label>
//         <input placeholder="yes" value={cleardata?.port_of_exit} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">sad500</label>
//         <input placeholder="Pending" value={cleardata.sad500} className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Quote Document</label>
//         <input
//           placeholder="1705310072449-profilemenu.png"
//           className="form-control"
//           readOnly=""
//           value={cleardata.document_upload}
//         />
//       </div>
//       <div className="col">
//         <label>trans_reference</label>
//         <input placeholder={0} value={cleardata.trans_reference} className="form-control" readOnly="" />
//       </div>
//     </div>
//     {/* <div className="row">
//       <div className="col">
//         <label htmlFor="">Comment</label>
//         <input placeholder="" className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">No. of Packages</label>
//         <input placeholder={12} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor=""> Package Type</label>
//         <input
//           placeholder="package type"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//     </div> */}
//     <div className="horizontalLine"></div>
//     {/* <div className="row">
//       <div className="col">
//         <label htmlFor="">Commodity</label>
//         <input placeholder="commodity" className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Hazardous</label>
//         <input placeholder="hazardous" className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label>Industry</label>
//         <input placeholder="healthCare" className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Country Id</label>
//         <input placeholder={5} className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Supplier Address</label>
//         <input
//           placeholder="supplier address"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//       <div className="col">
//         <label htmlFor="">Port of Loading</label>
//         <input
//           placeholder="port of loading"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//       <div className="col">
//         <label>Port of Discharge</label>
//         <input
//           placeholder="post of discharge"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//     </div> */}
//     {/* <div className="horizontalLine" /> */}
//     {/* <div className="row">
//       <div className="col">
//         <label htmlFor="">Place of Delivery</label>
//         <input
//           placeholder="place of delivery"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Ready for Collection</label>
//         <input
//           placeholder="ready for collection"
//           className="form-control"
//           readOnly=""
//         />
//       </div>
//       <div className="col">
//         <label>Assign Id</label>
//         <input placeholder={123} className="form-control" readOnly="" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">
//         <label>Loading Frequency</label>
//         <input placeholder={12} className="form-control" readOnly="" />
//       </div>
//       <div className="col">
//         <label htmlFor="">Transit Time</label>
//         <input placeholder="12ns" className="form-control" readOnly="" />
//       </div>
//     </div> */}
//     {/* <div className="horizontalLine" /> */}
//   </div>
// </section>

//     </div>
//     <Footer />
//     </>
//   )
// }
// import React from 'react';
// import { useLocation } from 'react-router-dom'
// import { Container, Row, Col } from 'react-bootstrap';
// import Topbar from '../Topbar';
// import Navbar from '../homepage/Navbar';
// import Footer from '../homepage/Footer';

// export default function Customdetails() {
//     const location = useLocation();
//     const cleardata = location?.state?.data;

//     return (
//         <>
//             <Topbar />
//             <Navbar />
//             <section className="formDetails">
//                 <Container className="mt-5">
//                     <h4 className="empyDetailHead">Custom Clearance Details</h4>
//                     <Row>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Clearing Result:</label>
//                                 <span className="detail-value">{cleardata?.clearing_result}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Clearing Agent:</label>
//                                 <span className="detail-value">{cleardata?.clearing_agent}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Client:</label>
//                                 <span className="detail-value">{cleardata?.client}</span>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Comment on Document:</label>
//                                 <span className="detail-value">{cleardata?.comment_on_docs}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Customer Reference:</label>
//                                 <span className="detail-value">{cleardata?.customer_ref}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Destination:</label>
//                                 <span className="detail-value">{cleardata?.destination}</span>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Document Required:</label>
//                                 <span className="detail-value">{cleardata?.document_req}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Goods Description:</label>
//                                 <span className="detail-value">{cleardata?.goods_desc}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Port of Entry:</label>
//                                 <span className="detail-value">{cleardata?.port_of_entry}</span>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Port of Exit:</label>
//                                 <span className="detail-value">{cleardata?.port_of_exit}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">SAD500:</label>
//                                 <span className="detail-value">{cleardata?.sad500}</span>
//                             </div>
//                         </Col>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Quote Document:</label>
//                                 <span className="detail-value">{cleardata?.document_upload}</span>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col lg={4} className="mb-4">
//                             <div className="detail">
//                                 <label className="detail-label">Transaction Reference:</label>
//                                 <span className="detail-value">{cleardata?.trans_reference}</span>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//             <Footer />
//         </>
//     );
// }
// import React from 'react';
// import { Container, Row, Col, Form } from 'react-bootstrap';
// import Topbar from '../Topbar';
// import Navbar from '../homepage/Navbar';
// import Footer from '../homepage/Footer';
// import { useLocation } from 'react-router-dom';

// export default function CustomDetails() {
//     const location = useLocation();
//     const data = location?.state?.data;

//     return (
//         <div>
//             <Topbar />
//             <Navbar />
//             <section className="formDetails">
//                 <Container className="mt-5">
//                     <h4 className="empyDetailHead">Custom Clearance Details</h4>
//                     <Row>
//                         {Object.entries(data).map(([key, value]) => (
//                             <Col key={key} lg={4} className="mb-4">
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>{key.replace(/_/g, ' ')}</Form.Label>
//                                     <Form.Control type="text" placeholder={value} readOnly />
//                                 </Form.Group>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Container>
//             </section>
//             <Footer />
//         </div>
//     );
// }
// import React from 'react';
// import { Container, Row, Col, Form } from 'react-bootstrap';
// import Topbar from '../Topbar';
// import Navbar from '../homepage/Navbar';
// import Footer from '../homepage/Footer';
// import { useLocation } from 'react-router-dom';

// export default function CustomDetails() {
//     const location = useLocation();
//     const data = location?.state?.data;

//     // Define an array of keys to exclude from rendering
//     const excludedKeys = ['key1']; // Add keys you want to exclude

//     // Filter out excluded keys from data
//     const filteredData = Object.fromEntries(
//         Object.entries(data).filter(([key]) => !excludedKeys.includes(key))
//     );

//     return (
//         <div>
//             <Topbar />
//             <Navbar />
//             <section className="formDetails">
//                 <Container className="mt-5">
//                     <h4 className="empyDetailHead">Custom Clearance Details</h4>
//                     <Row>
//                         {Object.entries(filteredData).map(([key, value]) => (
//                             <Col key={key} lg={4} className="mb-4">
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>{key.replace(/_/g, ' ')}</Form.Label>
//                                     <Form.Control type="text" placeholder={value} readOnly />
//                                 </Form.Group>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Container>
//             </section>
//             <Footer />
//         </div>
//     );
// }
import React, { useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import { useLocation } from 'react-router-dom';

export default function CustomDetails() {
  useEffect(()=>{
getdata()
  },[])

  const getdata=()=>{
    window.scrollTo(0,0)
  }
    const location = useLocation();
    const data1 = location?.state?.data;
console.log(location?.state?.data)
    // Explicitly pick fields to include in the data object
    const data = {
        clearing_status: data1?.clearing_status,
        comment_on_docs: data1?.comment_on_docs,
        customer_ref: data1?.customer_ref,
        destination: data1?.destination,
        goods_desc: data1?.goods_desc,
        port_of_entry: data1?.port_of_entry,
        port_of_exit: data1?.port_of_exit,
        document_upload: data1?.document_upload,
    };

    // Define keys to exclude from rendering
    const excludedKeys = ['Comment', 'Dimension', 'Hazardous']; // Add keys you want to exclude

    // Filter out excluded keys from data
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !excludedKeys.includes(key))
    );

    return (
     <>
   
     {/* <p>jgsdfkdg</p></> */}
        <div>
            <Topbar />
            <Navbar />
            <section className="formDetails">
                <Container className="mt-5">
                    <h4 className="empyDetailHead">Custom Clearance Details</h4>
                    <Row>
                        {Object.entries(filteredData).map(([key, value]) => (
                            <Col key={key} lg={4} className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className='text-capitalize'>{key.replace(/_/g, ' ')}</Form.Label>
                                    <Form.Control type="text" placeholder={value} readOnly />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />
        </div>
        </>
    );
}
