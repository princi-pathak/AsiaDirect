
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import image1 from '../../assestss/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [addFreightVisible, setAddFreightVisible] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setAddFreightVisible(false);
    if (localStorage.getItem('data') === null || undefined) {
      navigate('/login');
      toast.error("!!! Please Login !!!");
    } else {
      setAddFreightVisible(false); // Hide the button when navigating to '/addfreight'
      navigate('/addfreight');
    }
  };
  // const handleNavigateTracking = () => {
  //   navigate('/Tracking');
  // };

  const userId = JSON.parse(localStorage.getItem('data'))?.id;

  const handleNavigatecleanence = () => {
    navigate('/Add-Custom-clearence')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            <img src={image1} alt="hello" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse menu" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item headNav" >
                <NavLink activeClassName="active" to={"/"} aria-current="page">
                  Home
                </NavLink>
              </li>
              {
                userId && (
                  <li className="nav-item headNav">
                    <NavLink activeClassName="active" to={'/freight-details'}>
                      Freights
                    </NavLink>
                  </li>
                )
              }

              <li className="nav-item headNav">
                <NavLink activeClassName="active" to={"/Tracking"}>
                  Tracking
                </NavLink>
              </li>
              {/* {userId && (
                <li className="nav-item headNav">
                  <NavLink activeClassName="active" to={'/Shipment'}>
                    Shipment
                  </NavLink>
                </li>
              )} */}

              {userId && (
                <li className="nav-item headNav">
                  <NavLink activeClassName="active" to={'/Custom-clearence'}>
                    Custom Clearance
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="callNav">
            {addFreightVisible === true ? (
              <button
                className="btn text-white fw-bolder px-4 py-2"
                onClick={handleNavigate}
                style={{ backgroundColor: "#ce1d22" }}
              >
                Add Freight
              </button>
            ) : (
              <button
                className="btn text-white fw-bolder px-4 py-2"
                onClick={handleNavigatecleanence}
                style={{ backgroundColor: "#ce1d22" }}
              >
                Add clearance
              </button>
            )
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

