import React, { useEffect, useState } from 'react'
import image1 from '../../assestss/logo.png'
import image2 from '../../assestss/subscribe-1.png'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
export default function Footer() {
  const [data, setData] = useState({})
  const getdata = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}get-social-links`).then((response) => {
      setData(response.data.data)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
  useEffect(() => {
    getdata()
  }, [])
  console.log(data)
  return (
    <div>
      <footer>
        <section className="footerUpper">
          <div className="container">
            <div className="row subsBg wow fadeInDown">
              <div className="col-lg-8">
                <div className="NewsSelter">
                  <div>
                    <h2>Subscribe to our Newsletter!</h2>
                    <input type="text" placeholder='Enter your email' />
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footerImg">
                  <img src={image2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="footerContent">
          <div className="container">
            <div className="row borderFotter">
              <div className="col-lg-6 col-sm-6">
                <div className="footerLogoContent">
                  <div className="footerLogo">
                    <img src={image1} alt="" />
                  </div>
                  <p>
                    Asia Direct: Southern Africa's leading Procurement & Logistics Provider for Medical, Furniture, Automotive, Agricultural & Mining with Offices in South Africa,Botswana, Namibia, Zambia & Zimbabwe.
                  </p>
                  {
                    <>
                      <ul className="footerIconSocial">
                        <li>
                          <a href={data?.facebook_link}>
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href={data?.linkedin_link}>
                            <i className="fa fa-skype text-white" />
                          </a>
                        </li>
                        <li>
                          <a href={data?.twitter_link}>
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href={data?.instagram_link}>
                            <i className="fa fa-instagram" />
                          </a>
                        </li>
                      </ul>
                    </>
                  }
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="cateforiesContent">
                  <h5>Categories</h5>
                  <ul>
                    <li>
                      <NavLink>Shipping</NavLink>
                    </li>
                    <li>
                      <NavLink>Product Sourcing</NavLink>
                    </li>
                    <li>
                      <NavLink to={'/customClear'}>Customs clearing</NavLink>
                    </li>
                    <li>
                      <NavLink to={'/warehouse'}>Warehousing</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="copyPara">
                  Copyright © 2023, All rights reserved. Powered by webnmobapps solution.
                </p>
              </div>
              <div className="col-md-6">
                <div className="listCopy">
                  <ul>
                    <li>
                      <Link to={'/Terms-condition'}>Terms & Condition</Link>
                    </li>
                    <li style={{borderRight:"none"}}>
                      <Link to={'/Privacy-policy'}>Privacy policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
