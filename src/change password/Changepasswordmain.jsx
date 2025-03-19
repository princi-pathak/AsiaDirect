import React, { useState } from 'react';
import Topbar from '../component/Topbar';
import Navbar from '../component/homepage/Navbar';
import Footer from '../component/homepage/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Changepasswordmain() {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleClick = () => {
    handleValidate(data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleValidate = (value) => {
    let error = {};
    if (!value.oldpassword) {
      error.oldpassword = "Old Password is required";
    }
    if (!value.newpassword) {
      error.newpassword = "New Password is required";
    }
    if (!value.confirmpassword) {
      error.confirmpassword = "Confirm Password is required";
    }
    if (value.oldpassword && value.newpassword && value.oldpassword === value.newpassword) {
      error.newpassword = "New Password must be different from Old Password";
    }
    if (value.newpassword && value.confirmpassword && value.newpassword !== value.confirmpassword) {
      error.confirmpassword = "New Password and Confirm Password do not match";
    }
    setError(error);
    if (Object.keys(error).length === 0) {
      apihit();
    }
  };
  const userid = JSON.parse(localStorage.getItem('data'));
  const apihit = () => {
    const passwordChange = {
      id: userid.id,
      oldpassword: data.oldpassword,
      newpassword: data.newpassword,
      confirmpassword: data.confirmpassword,
    };
    console.log(passwordChange);
    axios.post(`${process.env.REACT_APP_BASE_URL}change-password`, passwordChange)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <Topbar />
      <Navbar />
      <section className="changePass">
        <div className="container">
          <div className="row">
            <div className="mainDiv">
              <div className="cardStyle">
                <form action="" method="post" name="signupForm" id="signupForm">
                  <h2 className="formTitle">Change Password</h2>
                  <div className="inputDiv">
                    <label className="inputLabel" htmlFor="password1">
                      Old Password
                    </label>
                    <input
                      type="password"
                      id="password1"
                      name="oldpassword"
                      required=""
                      onChange={handleChange}
                    />
                    <p className='text-danger'>{error.oldpassword}</p>
                  </div>
                  <div className="inputDiv">
                    <label className="inputLabel" htmlFor="password">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="newpassword"
                      required=""
                      onChange={handleChange}
                    />
                    <p className='text-danger'>{error.newpassword}</p>
                  </div>
                  <div className="inputDiv mb-3">
                    <label className="inputLabel" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmpassword"
                      onChange={handleChange}
                    />
                    <p className='text-danger'>{error.confirmpassword}</p>
                  </div>
                  <div className='text-center'>
                    <p className='btn btn-danger px-5' onClick={handleClick}>Change Password</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}
