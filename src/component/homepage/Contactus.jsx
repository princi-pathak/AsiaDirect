import React, { useState } from "react";
import Topbar from "../Topbar";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";
import image from "../../assestss/custom.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Contactus() {
  const [data, setData] = useState({
    name: "",
    phone_no: "",
    email: "",
    subject: "",
    message: "",
  });
  const naviagte = useNavigate();
  const handlechnage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postdata = () => {
    const data1 = {
      name: data.name,
      phone_no: data.phone_no,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}addQueries`, data1)
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        setTimeout(() => {
          naviagte("/");
        }, [1000]);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  //  call
  const phoneNumber = "+27104480733";

  const handleCall = () => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("Phone calling works only on mobile devices.");
    }
  };
  // email
  const openGmail = () => {
    const email = "sa@asiadirect.africa";
    const subject = "Inquiry";
    const body = "Hello, I would like to know more...";
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
      "_blank"
    );
  };
  return (
    <div>
      <div>
        <Topbar />
        <Navbar />
        <>
          {/* <section
     className="bannerBg"
     style={{ backgroundImage: `url(${image}) `}}
   >
     <div className="container">
       <div className="row">
         <div className="col-lg-12">
           <h1>Contact Us</h1>
           <h5>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. illo quae
             vero{" "}
           </h5>
         </div>
       </div>
     </div>
   </section> */}
          {/* <section className="contactUsSec">
     <div className="container">
       <div className="row">
         <div className="col-lg-4">
           <div className="cardContactMain">
             <div className="rotateCenter">
               <div className="rotateBox">
                 <i className="fas fa-map-marker-alt" />
               </div>
             </div>
             <div className="contentCard">
               <h5>Our Location</h5>
               <p>354 Oakridge, Camden NJ 08102 - USA</p>
             </div>
           </div>
         </div>
         <div className="col-lg-4">
           <div className="cardContactMain">
             <div className="rotateCenter">
               <div className="rotateBox">
                 <i className="fas fa-envelope" />
               </div>
             </div>
             <div className="contentCard">
               <h5>Our Location</h5>
               <p>exampal@gmail.com</p>
               <p> www.unicktheme.com</p>
             </div>
           </div>
         </div>
         <div className="col-lg-4">
           <div className="cardContactMain">
             <div className="rotateCenter">
               <div className="rotateBox">
                 <i className="fas fa-phone-alt" />
               </div>
             </div>
             <div className="contentCard">
               <h5>Our Location</h5>
               <p>+012 (999) 666 22</p>
               <p> +856352287</p>
             </div>
           </div>
         </div>
       </div>
       <div className="row">
         <div className="col-lg-12">
           <div className="shadowRow">
             <form>
               <div className="row">
                 <div className="col">
                   <input
                     type="text"
                     className="form-control"
                     placeholder="Name"
                   />
                 </div>
                 <div className="col">
                   <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                   />
                 </div>
               </div>
               <div className="row mt-4">
                 <div className="col">
                   <input
                     type="number"
                     className="form-control"
                     placeholder="Phone"
                   />
                 </div>
                 <div className="col">
                   <input
                     type="text"
                     className="form-control"
                     placeholder="subject"
                   />
                 </div>
               </div>
               <div className="row mt-4">
                 <div className="col">
                   <textarea
                     name=""
                     id=""
                     className="form-control"
                     cols={30}
                     rows={10}
                     placeholder="message"
                     defaultValue={""}
                   />
                 </div>
               </div>
               <div className="row">
                 <div className="col">
                   <div className="btnContact">
                     <button>Submit</button>
                   </div>
                 </div>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </section> */}
          <section>
            <div class="container my-5">
              <div class="row justify-content-center mt-5 align-items-center asiaContact">
                <div class="col-md-9">
                  <div class="div1 mb-4">
                    <h2 class="heading_1">Get in touch</h2>
                  </div>
                  <form method="post">
                    <div class="row">
                      <div class="col-md-6">
                        <label class="div_label">Name*</label>
                        <input
                          type="text"
                          class="box1 form-control "
                          name="name"
                          placeholder="Name"
                          onChange={handlechnage}
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="div_label">Phone No.*</label>
                        <input
                          type="text"
                          class="box1 form-control "
                          name="phone_no"
                          placeholder="Phone no."
                          onChange={handlechnage}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label class="div_label">Email*</label>
                        <input
                          type="email"
                          name="email"
                          class="box1 form-control"
                          placeholder="Email"
                          onChange={handlechnage}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label class="div_label">Subject*</label>
                        <input
                          type="text"
                          name="subject"
                          class="box1 form-control"
                          placeholder="Subject"
                          onChange={handlechnage}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label class="div_label">Nature of Enquiry*</label>
                        <div>
                          <select name="enquiryType" required>
                            <option value="">Select...</option>
                            <option value="Sales">Sales</option>
                            <option value="Accounts">Accounts</option>
                            <option value="Support">Support</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label class="div_label">Country / Office*</label>
                        <div>
                          <select name="enquiryType" required>
                            <option value="">Select...</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Dubai">Dubai</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label class="div_label">Message*</label>
                        <textarea
                          class="box2 form-control "
                          name="message"
                          onChange={handlechnage}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <Button className="btn_add_web" onClick={postdata}>
                      Submit
                    </Button>
                  </form>
                </div>
                <div class="col-md-3">
                  <div class="main3">
                    <div class="">
                      <div
                        class="d-flex mb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps?q=Johannesburg, South+Africa",
                            "_blank"
                          )
                        }
                      >
                        <div class="">
                          <i class="fi fi-rr-marker icon1"></i>
                        </div>
                        <div class="">
                          <h6 class="call_heading">Address:</h6>
                          <p class="para1">Johannesburg, South Africa</p>
                        </div>
                      </div>
                      <div class="d-flex mb-3">
                        <div class="">
                          <i class="fi fi-rr-phone-call icon1"></i>
                        </div>
                        <div onClick={handleCall} style={{ cursor: "pointer" }}>
                          <h6 className="call_heading">Phone Number:</h6>

                          <p className="para1">{phoneNumber}</p>
                        </div>
                      </div>
                      <div class="d-flex mb-3">
                        <div class="">
                          <i class="fi fi-rr-envelope icon1"></i>
                        </div>
                        <div
                          onClick={openGmail}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <h6 className="call_heading">Email Address:</h6>
                          <p className="para1">sa@asiadirect.africa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
