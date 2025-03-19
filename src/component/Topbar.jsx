import imageforuser from '../assestss/team-1.png'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import imagelogo from '../assestss/logoasia.png'
import { Link, useNavigate } from 'react-router-dom'
export default function Topbar() {
  const [userData, setUserData] = useState({})
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const hanldeclicklogin = () => {
    navigate('/login')
  }
  const handlkecloick = () => {
    navigate('/notification')
  }
  const user = JSON.parse(localStorage.getItem('data'))
  const userid = user?.id
  const handleclicknavi = () => {
    if (!userid) {
      navigate('/login');
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}notification-users`, {
        user_id: userid
      })
        .then((response) => {
          setData(response.data.data); 
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  const handleclicklogout = () => {
    localStorage.clear()
    navigate('/')
  }
  const fetchData = () => {
    const user = JSON.parse(localStorage.getItem('data'));
    axios.post(`${process.env.REACT_APP_BASE_URL}client-details`, {
      client_id: user?.id
    }).then((response) => {
      setUserData(response?.data?.data)
    }).catch((error) => {
      console.log(error.response.data)
    })
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(imagelogo)
  console.log(userData?.profile)
  return (
      <div>
        <section className="topBar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7">
                <div className="topParentLeft">
                  <div className="topLeftChild">
                    <p>
                      <i className="fi fi-ss-envelope" />{" "}
                      <span>sa@asiadirect.africa </span>
                    </p>
                  </div>
                  <div className="topLeftChild">
                    <p>
                      <i className="fi fi-rs-marker" />
                      <span>     Johannesburg, South Africa
                      </span>
                    </p>
                  </div>
                  <div className="topLeftChild">
                    <p>
                      <i className="fi fi-rr-phone-call" />{" "}
                      <span> +27 10 448 0733 </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="topRightParent">
                  <div >
                    {
                      userid ? (
                        <li className="nav-item dropdown  notiDrop" onClick={handleclicknavi}>
                          <a className="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
                            <i className="fi fi-ss-bell"></i>
                          </a>
                          <ul className="dropdown-menu sidebar123">
                            <h5>Notification</h5>
                            <div className="scrollNoti">
                              {
                                data && data.length > 0 ? (
                                  data.map((item, index) => (
                                    <div className="notidropparent" key={index}>
                                      <div>
                                        <h6 className='text-dark text-capitalize'>{item?.title}</h6>
                                        <p>{item?.description}</p>
                                      </div>
                                      <div className="dateTopNoti"></div>
                                    </div>
                                  ))
                                ) : (
                                  <div>
                                    {data.length === 0 ? (
                                      <p className='fw-bold' style={{ marginTop: "100px" }}>No notifications</p>
                                    ) : (
                                      <p>One notification</p>
                                    )}
                                  </div>
                                )
                              }
                            </div>
                            <div className="btnShowAll">
                              <button onClick={handlkecloick}> View all notification</button>
                            </div>
                          </ul>
                        </li>
                      ) : (
                        <p></p>
                      )
                    }
                  </div>
                  {
                    userid ? (
                      <div>
                        <li className="nav-item dropdown dropImg">
                          <a className="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
                            {
                              userData?.profile === "" ? (
                                <img src={imagelogo} alt="dfsdfsf" />
                              ) : (
                                <img src={`${process.env.REACT_APP_BASE_URL_image}${userData?.profile}`} alt="dfsdfsf" />
                              )
                            }
                          </a>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => { navigate('/My-profile') }}>My Profile</a></li>
                            <li><Link className="dropdown-item" to={'/order-details'} >My Order</Link></li>
                            <li><Link className="dropdown-item" to={"/Custom-clearence"}>My Clearance</Link></li>
                            <li><Link className="dropdown-item" to={"/Clearence-order"}>Clearance Order</Link></li>
                            <li><Link className="dropdown-item" to={'/Changepassword'}>Change Password</Link></li>
                            <li><a className="dropdown-item" onClick={handleclicklogout}>Logout</a></li>
                          </ul>
                        </li>
                      </div>
                    ) : (
                      <div style={{ width: "50px", height: "30px" }}>
                        <button className='px-2 py-1 rounded' style={{ backgroundColor: "#d01b20", color: "white " }} onClick={hanldeclicklogin}>Login</button>
                        {/* <image src={imagelogo} className='border' alt="logo"  /> */}
                        {/* <i className="fi fi-rr-circle-user" onClick={hanldeclicklogin} style={{ cursor: "pointer" }} /> */}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
