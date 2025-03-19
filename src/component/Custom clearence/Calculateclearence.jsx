
import React, { useEffect, useState } from 'react';
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function Calculateclearence() {
  const navigate = useNavigate()
  const [hfCode, setHfCode] = useState('');
  const [data, setData] = useState({})
  const [values, setVlaues] = useState([])
  const [error, setError] = useState({})
  const [csercount, setCsercount] = useState()
  const handleInputChange = (e) => {
    setHfCode(e.target.value);
  };
  const handlevalidate = (e) => {
    if (e.charCode < 46 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const handleclickhf = () => {
    const hfcoede = {
      hs_code: hfCode
    }
    console.log(hfcoede)
    axios.post(`${process.env.REACT_APP_BASE_URL}find-hs-code`, hfcoede).then((response) => {
      console.log(response.data.data)
      setData(response.data.data)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }
  const handlechangevalueoggood = (e) => {
    const { name, value } = e.target
    setVlaues({ ...values, [name]: value })
  }
  const handleclickvalyue = () => {
    const finalval = values.valueofgoods;
    const calculate10 = finalval * 0.1;
    console.log(calculate10);
    const overall = parseFloat(finalval) + parseFloat(calculate10);
    const finalRes = overall * parseFloat(values?.quotedRate)
    setCsercount(finalRes)
  }
  const valtcalc = csercount * 0.1
  const datavalttac = valtcalc.toFixed(2)
  const imporDuty = (parseFloat(datavalttac) + parseFloat(csercount)) * 0.15
  const datavat = imporDuty.toFixed(2)
  const estimate = parseFloat(datavat) + parseFloat(datavalttac)
  const location1 = useLocation()
  const clearenceid1 = (location1?.state?.data)
  const location = useLocation()
  console.log(location.state)
  const clearenceid = (location?.state?.dataIID)
  console.log(clearenceid)
  const userid = JSON.parse(localStorage.getItem("data"))
  console.log(userid.id)
  const handlesvaevalue = () => {
    handlevalidate12(values);
  }
  useEffect(()=>{
    window.scrollTo(0,0)
toppaget()
  },[])
  const toppaget =() =>{
    window.scrollTo(0,0)
  }
  const handlevalidate12 = (value) => {
    let error = {};
    if (!value.valueofgoods) {
      toast.error('value of goods is required')
      error.valueofgoods = "value of goods is required"
    }
  //   if (!value.quotedRate) {
  //     toast.error('Quoted Rate is required')
  //     error.quotedRate = "Quoted Rate is required"
  //   } else {
  //     handleapi()
  //   }
  //   setError(error)
  // }
  if(!value.quotedRate){
    toast.error('Quoted Rate is required')
    error.quotedRate='Quoted Rate is required'
  }else{
    handleapi()
  }
  setError(error)}
  const handleapi = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}calculate-clearance`,
      {
        "clearance_id": clearenceid ? clearenceid : clearenceid1,
        "client_id": userid?.id,
        "quoted_rate": values?.quotedRate,
        "HS_tariff_code": hfCode,
        "HS_description": data.hs_cod_desc,
        "goods_value": values.valueofgoods,
        "values_of_good": csercount,
        "import_duty_per": 10,
        "vat_per": 15,
        "import_duty": datavat,
        "vat": datavalttac,
        "customs_amount_due": estimate
      }
    ).then((response) => {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/Custom-clearence')
      }, 1500)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }
  return (
    <div>
      <Topbar />
      <Navbar />
      <p className="my-3 fs-3 fw-bold text-center">Get Estimate</p>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <label className="" style={{ fontWeight: '600' }}>
              Enter your HS code
            </label>
            <br />
            <div className='d-flex mb-3'>
              <div className=''>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="HS Code"
                  value={hfCode}
                  onChange={handleInputChange}
                  onKeyPress={handlevalidate}
                />
              </div>
              <div className='ms-2'>
                {hfCode && (
                  <button className="btn btn-primary fw-bold rounded rounded-circle" onClick={handleclickhf}>+</button>
                )}
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table border">
              <thead>
                <tr>
                  <th scope="col">HS Code</th>
                  <th className='col-3' style={{ maxWidth: "200px" }}>Description</th>
                  <th scope="col"> VAT%</th>
                  <th scope="col">Value of Goods</th>
                  <th scope="col">Quoted Rate</th>
                  <th scope="col">Value Of Goods</th>
                  <th scope="col">VAT%</th>
                  <th scope="col">Import Duty</th>
                  <th scope="col">Calculate</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{data?.hs_cod}</th>
                  <td className='col-3' style={{ width: "200px" }}>{data.hs_cod_desc}</td>
                  <td>15%</td>
                  <td><input onKeyPress={handlevalidate} name='valueofgoods' onChange={handlechangevalueoggood}></input></td>
                  <td className='col-1'><input onKeyPress={handlevalidate} name='quotedRate' onChange={handlechangevalueoggood}>
                  </input><button className='ms-2 py-1 btn  rounded' onClick={handleclickvalyue} 
                  style={{ backgroundColor: "red", color: "white" }}>Add</button></td>
                  <td>{csercount}</td>
                  <td>{datavalttac}</td>
                  <td>{datavat}</td>
                  <td>{estimate.toFixed(2)}</td>
                  <button className='ms-2 py-1 btn  rounded mt-2' 
                  onClick={handlesvaevalue} style={{ backgroundColor: "#0b5ed7", color: "white" }}>save</button>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
