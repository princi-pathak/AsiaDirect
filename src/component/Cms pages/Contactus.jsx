import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../homepage/Navbar'
import Footer from '../homepage/Footer'
import  image from '../../assestss/custom.jpg' 

export default function Contactus() {
  return (
    <div>
      <div>
      <Topbar />
      <Navbar />
      <>
  <section
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
  </section>
  <section className="contactUsSec">
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
  </section>
</>

      <Footer />
    </div>
    </div>
  )
}
