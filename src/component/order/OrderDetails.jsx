import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar'
import Navbar from '../homepage/Navbar'
import Footer from '../homepage/Footer'
import MyBackgroundImage from '../../assestss/slidenew2.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const pageSize = 5
export default function OrderDetails() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const userdata = JSON.parse(localStorage.getItem('data'))
  const navigaet = useNavigate()
  const getdata = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}order-details`, { user_id: userdata.id }).then((response) => {
      setData(response.data.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
  const handleclcick = (id,order_id) => {
    
    const userOrder = data.filter((item) => {
      return item.id === id
    })
    axios.post(`${process.env.REACT_APP_BASE_URL}get-order-status`,{order_id:`OR000${order_id}`}).then((response)=>{
      if(response.data.success===true){
 navigaet('/Tracking-status', {state:{data12:response.data.data}})
      }
    }).catch((error)=>{
      console.log(error.response.data)
    })
   
  }
  useEffect(() => {
    getdata()
  }, [])
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  const filteredData = data.filter(item => {
    console.log(item)
    return String(item.dimension).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.freight.toLowerCase().includes(searchQuery.toLowerCase())
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startindex = (currentPage - 1) * pageSize;
  const endIndex = startindex + pageSize;
  const currentdata = filteredData.slice(startindex, endIndex);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };
  const handleclickorder = (id) => {
    const orderdata = data.filter((item) => {
      return item.id === id;
    })
    console.log(orderdata[0])
    navigaet('/Order-details-conform', { state: { data: orderdata[0] } })
  }
  return (
    <div>
      <Topbar />
      <Navbar />
      <>
        <section
          className="bannerBg"
          style={{ backgroundImage: `url(${MyBackgroundImage})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>Order Detail's</h1>
                <h5>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. illo quae
                  vero{" "}
                </h5>
              </div>
            </div>
          </div>
        </section>
        <section className="manageFrightSec pt80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 border">
                {
                  data.length == 0 ? (
                    <p className='text-center my-5'>!!! Please Add freight & clearance for get our service !!!</p>
                  ) :
                    (
                      <>
                        <div className="tableManageFright table-responsive p-2">
                          <div className='d-flex justify-content-between text-end'>
                            <div>
                              <p className=' text-center fw-bold fs-2'>Order Detail's</p>
                            </div>
                            <div>
                              <input className='ms-auto my-3 py-2 px-2 mx-5 rounded ' value={searchQuery}
                                onChange={handleSearch} placeholder='Search freight...'></input>
                            </div>
                          </div>
                          <table className="table table-striped border">
                            <thead>
                              <tr>
                                <th className='col-1'>Order id</th>
                                <th className='col-1'>Client name</th>
                                <th className='col-1'> Date</th>
                                {/* <th className='col-1'>Freight</th>
                                <th className='col-1'>Dimension</th>
                                <th className='col-1'>Weight</th> */}
                                <th className='col-1'>Cartons</th>
                                <th className='col-1'> Package</th>
                                <th className='col-1' >Track</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                currentdata && currentdata.length > 0 && currentdata.map((item, index) => {
                                  console.log(item)
                                  const datenw = new Date(item.date);
                                  const options = {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                  };
                                  const formattedDate = datenw.toLocaleDateString("en-GB", options);
                                  console.log(formattedDate);
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>OR000{item.order_id}</td>
                                        <td className='col-2'  onClick={() => { handleclickorder(item.id) }}>{item.full_name}</td>
                                        <td className='col-2'  onClick={() => { handleclickorder(item.id) }}>{formattedDate}</td>
                                        {/* <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>{item.freight}</td>
                                        <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>{item.dimension}</td>
                                        <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>{item.weight}</td> */}
                                        <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>{item.cartons}</td>
                                        <td className='col-1'  onClick={() => { handleclickorder(item.id) }}>{item.no_of_packages}</td>
                                        {/* <td>
                                          <i className="fa fa-eye" />
                                        </td> */}
                                        <td>
                                          <i className="fi fi-br-track" style={{cursor:'pointer'}} onClick={() => { handleclcick(item.id,item.order_id) }} />
                                        </td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                          <div className='mt-4'>
                            <button disabled={currentPage === 1} className='btn rounded' style={{ backgroundColor: "red", color: "white" }} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                            <span>{`Page ${currentPage} of ${totalPage}`}</span>
                            <button disabled={currentPage === totalPage} className='btn rounded' style={{ backgroundColor: "#1b2245", color: "white" }} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                          </div>
                        </div>
                      </>
                    )
                }
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  )
}
