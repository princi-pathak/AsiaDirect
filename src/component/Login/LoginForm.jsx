
import React, { useEffect, useState } from 'react';
import mage1 from '../../assestss/logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const handletop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handletop();
  }, []);

  const [data, setData] = useState({
    password: '',
    email: ''
  });
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlevalidate = (value) => {
    let error = {};
    if (!value.email) {
      error.email = 'Email is required';
    } else if (!isValidEmail(value.email)) {
      error.email = 'Please Enter a valid email';
    }
    if (!value.password) {
      toast.error('Password is required');
      error.password = 'Password is required';
    } else {
      apihit();
    }
    setError(error);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleclick = () => {
    handlevalidate(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleclick();
    }
  };

  const apihit = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}customer-login`, data)
      .then((response) => {
        if (response.data.success === true) {
        
          localStorage.setItem('data', JSON.stringify(response.data.data));
          localStorage.setItem('profile', JSON.stringify(response.data.data.profile));
          navigate('/');
        }
        if (response.data.success === false) {
          toast.error('enter valid email or password');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <section className="loginSec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-center align-items-center">
                <div className="loginFormMain">
                  <div className="logoLogin">
                    <img src={mage1} alt="dfdfd" />
                  </div>
                  <div className="mb-3">
                    <input type="email" placeholder="Email" name="email" onChange={handlechange} />
                    <p className="text-danger">{error.email}</p>
                  </div>
                  <div className="mb-5">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handlechange}
                      onKeyPress={handleKeyPress}
                    />
                    <br />
                    <p className="text-danger">{error.password}</p>
                    <Link to={'/forgot-password'} style={{ fontSize: '18px' }}>
                      Forgot Password?
                    </Link>
                    <div className="d-flex"></div>
                  </div>
                  <div className="btnLogin mb-5">
                    <button onClick={handleclick}>Submit</button>
                  </div>
                  <span className="RegisLink text-center">
                    Don't have an account? <Link to={'/register'}> Sign Up</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bgPosition"></div>
      </section>
      <ToastContainer />
    </div>
  );
}
