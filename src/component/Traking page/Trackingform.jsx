import React, { useState } from 'react'
import Trackingiamge from '../../assestss/slidenew3.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default function Trackingform() {

    const [data,setData]=useState({})
    const [error,setError]=useState({})
    const navigate = useNavigate()
    const handlechange =(e) => {
const {name,value}=e.target
setData({...data,[name]:value})
}


const handleclcick=()=>{
    handlevalidate(data)
}
const handlevalidate =(value)=>{
    let error={};
    if(!value.order_id){
        error.order_id="Enter your tracking number"
    }else{
      apihit()
       
    }
    setError(error)
}

const apihit=()=>{
  axios.post(`${process.env.REACT_APP_BASE_URL}get-order-status`,{order_id:data.order_id}).then((response)=>{
    toast.success(response.data.message)
    console.log(response.data.data)
    navigate('/Tracking-status',{state:{data12:response.data.data}})
  }).catch((error)=>{
    toast.error(error.response.data.message)
    console.log(error.response.data)
  })
}

  return (
    <div>
        <>
  <section
    className="bannerBg"
    style={{ backgroundImage: `url(${Trackingiamge})` }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1>Tracking</h1>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. illo quae
            vero{" "}
          </h5>
        </div>
      </div>
    </div>
  </section>
  <div data-aos="fade-up">
  <section className="trackSec pt80">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2>Track a shipment</h2>
          <p>
            Track your LTL, truckload, or intermodal shipment by entering your
            <b> Track number </b>
            below to get instant freight tracking information.
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-sm-12">
          <div className="traceSpace">
            <div className="inputTrack">
              <div className="w-100">
                <input type="text" placeholder="Tracking number" name='order_id' onChange={handlechange} />
                <p className='text-danger'>{error.order_id}</p>
              </div>
              <div>
                <button onClick={handleclcick}>Track</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</>
<ToastContainer />

    </div>
  )
}
