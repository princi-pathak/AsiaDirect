import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Addclearing() {
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null)
    const [sad500, setSad500] = useState(null)
    const [country, setCountry] = useState([])
    const [data, setData] = useState({
        trans_reference: "",
        client: "",
        customer_ref: "",
        goods_desc: "",
        destination: "",
        port_of_entry: "",
        port_of_exit: "",
        clearing_agent: "",
        clearing_status: "",
        clearing_result: "",
        document_req: "",
        document: null,
        sad500: "",
        comment_on_docs: ""
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const userid = JSON.parse(localStorage.getItem('data'))
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }
    const handle500 = (e) => {
        setSad500(e.target.files[0]);
    }
    const handleclick = () => {
        handlevalidate(data)
    }
    const handlevalidate = (value) => {
        let error = {}
        if (!value.customer_ref) {
            error.customer_ref = 'Customer reference is required'
        }
        if (!value.trans_reference) {
            error.trans_reference = 'Transaction reference is required'
        }
        if (!value.goods_desc) {
            error.goods_desc = 'Goods description is required'
        }
        if (!value.port_of_entry) {
            error.port_of_entry = 'Port of entry is required'
        }
        if (!value.port_of_exit) {
            error.port_of_exit = 'Port of origin is required'
        }
        if (!value.destination) {
            error.destination = 'Destination is required'
        }
        else {
            handleapi()
        }
        setError(error)
    }
    const handleapi = () => {
        const formdata = new FormData()
        formdata.append('user_id', userid?.id);
        formdata.append('customer_ref', data?.customer_ref);
        formdata.append('goods_desc', data?.goods_desc);
        formdata.append('destination', data?.destination);
        formdata.append('port_of_exit', data?.port_of_exit);
        formdata.append('port_of_entry', data?.port_of_entry);
        formdata.append('document', selectedImage);
        formdata.append('comment_on_docs', data?.comment_on_docs);
        axios.post(`${process.env.REACT_APP_BASE_URL}add-clearing-customer`, formdata).then((response) => {
            if (response.data.success === true) {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate('/calculate-clearence', { state: { dataIID: response.data.clearing_id } })
                }, 500)
            } else {
                toast.error("Something went wrong")
            }
        }).catch((error) => {
            toast.error(error)
        })
    }
    useEffect(() => {
        getcountry()
    }, [])
    const getcountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}countrylist`).then((response) => {
            setCountry(response.data.data)
        }).catch((error) => {
            toast.errror(error.response.data.data)
        })
    }
    return (
        <div>
            <Topbar />
             <Navbar />
                     <>
                <section className="freightSec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1>Custom Clearance</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="manageFrightSec pt80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="addClearance">
                                    <form action="">
                                        <div className="row mt-2">
                                            <div className="col-lg-6">
                                                <label htmlFor="">Customer Ref</label>
                                                <input type="text" className="form-control" onChange={handleInputChange} name="customer_ref" />
                                                <p className='text-danger'>{error.customer_ref}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Goods Description</label>
                                                <input type="text" className="form-control" onChange={handleInputChange} name="goods_desc" />
                                                <p className='text-danger'> {error.goods_desc}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Destination</label>
                                                <input type="text" className="form-control" onChange={handleInputChange} name="destination" />
                                                <p className='text-danger'> {error.destination}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Port of Entry</label>
                                                <select name="port_of_entry" className="form-select" onChange={handleInputChange}>
                                                    <option>Select...</option>
                                                    <option>Durban</option>
                                                    <option>Johannesburg</option>
                                                    <option>OR Tambo</option>
                                                    <option>Capetown</option>
                                                </select>
                                                <p className='text-danger'>{error.port_of_entry}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Port of Origin</label>
                                                <select className='form-select' onChange={handleInputChange} name="port_of_exit">
                                                    {
                                                        country && country.length > 0 && country.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} value={item.id}>{item.country_of_origin}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <p className='text-danger'>{error.port_of_exit}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Country of Origin</label>
                                                <select className='form-select' onChange={handleInputChange} name="port_of_exit">
                                                    {
                                                        country && country.length > 0 && country.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index} value={item.id}>{item.country_of_origin}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <p className='text-danger'>{error.port_of_exit}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Document Upload</label>
                                                <input type="file" onChange={handleImageChange} name="document" />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Comment on Docs</label>
                                                <input type="text" className="form-control" onChange={handleInputChange} name="comment_on_docs" />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Industry</label>
                                                <select className="form-select" onChange={handleInputChange} name="industry">
                                                    <option>Medical</option>
                                                    <option>Electronic</option>
                                                    <option>Cosmetic</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">Currency</label>
                                                <select className="form-select" onChange={handleInputChange} name="industry">
                                                    <option>USD</option>
                                                    <option>RAND</option>
                                                    <option>EURO</option>
                                                    <option>INR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <button className='btn btnFreight2 mb-3' onClick={handleclick}>Add Clearance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            <Footer />
            <ToastContainer />
        </div>
    )
}