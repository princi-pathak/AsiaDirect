import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar'
import Navbar from '../homepage/Navbar'
import Footer from '../homepage/Footer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MessageIcon from '@mui/icons-material/Message';
const pageSize = 5;
export default function Managefreight() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([])
    const [radioButton, setRadioButton] = useState("")
    const currentuser = JSON.parse(localStorage.getItem('data'))
    const [updatedata, setUpdatedata] = useState({})
    const [inputData, setInputData] = useState({})
    const [secondRadio, setSecondRadio] = useState({})
    const [thirdRadio, setThirdadio] = useState({})
    const [quantdata, setQuantdata] = useState({})
    const [country, setCountry] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
        getdata()
    }, [])
    const getdata = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}client-freights`, { user_id: currentuser?.id }).then((response) => {
            setData(response.data.data)
        }).catch((error) => {
            toast.error(error.response.data)
        })
    }
    const handledelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${process.env.REACT_APP_BASE_URL}delete-freight`, { freight_id: id }).then((response) => {
                    toast.success(response.data.message)
                    getdata()
                }).catch((error) => {
                    toast.error(error.response.data.message)
                })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    ////////////////////////////////////update    ////////////////////////////////////

    const handleupdate = (id) => {
        const userdata = data.filter((item) => {
            return item.id === id
        })
        const reguser = userdata[0]
        console.log(reguser)
        setInputData((prevData) => ({
            ...prevData,
            shipment_ref: reguser.shipment_ref,
            freight_id: id,
            status: reguser.status,
            shipment_origin: secondRadio,
            sea_freight_option: reguser.sea_freight_option,
            road_freight_option: reguser.road_freight_option,
            add_attachments: reguser.add_attachments,
            ready_for_collection: reguser.ready_for_collection,
            product_desc: reguser.product_desc,
            post_of_discharge: reguser.post_of_discharge,
            port_of_loading: reguser.port_of_loading,
            package_type: reguser.package_type,
            no_of_packages: reguser.no_of_packages,
            nature_of_goods: reguser.nature_of_goods,
            freight_type: reguser.freight_type,
            freight: reguser.freight,
            auto_calculate: reguser.auto_calculate,
            dimension: reguser.dimension,
            weight: reguser.weight,
            delivery_to: reguser.delivery_to,
            delivery_address: reguser.delivery_address,
            shipment_des: reguser.shipment_des,
            comment: reguser.comment,
            collection_from: reguser.collection_from,
            collection_address: reguser.collection_address,
            client_name: reguser.client_name,
            delivery_to_country: reguser.delivery_to_country,
        }));

        setRadioButton(reguser.user_type)
        setSecondRadio(reguser.shipment_origin)
        setThirdadio(reguser.shipment_des)
    }
    console.log(inputData.delivery_to)
    console.log("inputData:", inputData);
    const dddd = (e) => {
        setRadioButton(e.target.value)
    }
    const handlethird = (e) => {
        setThirdadio(e.target.value)
    }
    const secondradi = (e) => {
        setSecondRadio(e.target.value)
    }
    const handklechangeas = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, [name]: value })
    }
    const getcountry = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}countrylist`).then((response) => {
            setUpdatedata(response.data.data)
            console.log(response.data.data)
        }).catch((error) => {
            console.log(error.response.data.message)
        })
    }
    useEffect(() => {
        getcountry()
    }, [])
    const clienduidi = JSON.parse(localStorage.getItem("data"))
    const handleclicknavi = () => {
        const updatedata = {
            freight_id: inputData.freight_id,
            client_id: clienduidi.id,
            shipment_ref: inputData.shipment_ref,
            user_type: radioButton,
            status: inputData.status,
            shipment_origin: secondRadio,
            sea_freight_option: inputData.sea_freight_option,
            shipment_des: thirdRadio,
            road_freight_option: inputData.road_freight_option,
            ready_for_collection: inputData.ready_for_collection,
            product_desc: inputData.product_desc,
            post_of_discharge: inputData.post_of_discharge,
            port_of_loading: inputData.port_of_loading,
            add_attachments: inputData.add_attachments,
            package_type: inputData.package_type,
            no_of_packages: inputData.no_of_packages,
            nature_of_goods: inputData.nature_of_goods,
            auto_calculate: totaldimension ? totaldimension : inputData.auto_calculate,
            freight_type: inputData.freight_type,
            freight: inputData.freight,
            dimension: inputData.dimension,
            weight: inputData.weight,
            delivery_to: inputData.delivery_to,
            delivery_address: inputData.delivery_address,
            comment: inputData.comment,
            collection_from: inputData.collection_from,
            collection_address: inputData.collection_address,
            client_name: inputData.client_name,
            delivery_to_country: inputData.delivery_to_country,
        }
        console.log(updatedata)
        axios.post(`${process.env.REACT_APP_BASE_URL}update-freights`, updatedata).then((response) => {
            getdata()
            toast.success(response.data.message)
            const modal = document.getElementById('exampleModal');
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
            modalBackdrop.parentNode.removeChild(modalBackdrop);
        }).catch((error) => {
            toast.error(error.response.data.data.message)
        })
    }
    const handleclicknavigfh = (id) => {
        const allRowdata = data.filter((item) => {
            return item.id === id
        })
        console.log(allRowdata)
        navigate('/freight-full-details', { state: { printdata: allRowdata } })
    }
    const hanldedhgjdh = (id) => {
        console.log(id)
        axios.post(`${process.env.REACT_APP_BASE_URL}get-shipping-estimate`, { freight_id: id }).then((response) => {
            navigate('/Download-pdf', { state: response.data.data })
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const filteredData = data.filter(item => {
        return item.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.place_of_delivery.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(item.no_of_packages).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(item.weight).toLowerCase().includes(searchQuery.toLowerCase())
    });
    const totalPage = Math.ceil(filteredData.length / pageSize);
    const startindex = (currentPage - 1) * pageSize;
    const endIndex = startindex + pageSize;
    const currentdata = filteredData.slice(startindex, endIndex);
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    //////////////////////////////////////////// calculation//////////////////////////////////////////////////
    const [showInputs, setShowInputs] = useState(false);
    const handleClick = () => {
        setShowInputs(!showInputs);
    };
    const handelchangequant = (e) => {
        const { name, value } = e.target
        setQuantdata({ ...quantdata, [name]: value })
    }
    const dimensiion1 = isNaN(parseInt(quantdata?.length) * parseInt(quantdata?.width) * parseInt(quantdata?.height)) ? 0 : parseInt(quantdata?.length) * parseInt(quantdata?.width) * parseInt(quantdata?.height);
    const weight12 = isNaN(parseInt(quantdata?.Quantity) * parseInt(quantdata?.weight)) ? 0 : parseInt(quantdata?.Quantity) * parseInt(quantdata?.weight);

    const [age, setAge] = React.useState('');
    const datauserval = JSON.parse(localStorage.getItem('data'))
    console.log(datauserval.id)
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value)
        axios.post(`${process.env.REACT_APP_BASE_URL}client-freights`, {
            user_id: datauserval.id,
            status: event.target.value
        }).then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    };
    console.log(typeof (dimensiion1))
    const datadjgfhjk = dimensiion1 === "NaN" ? 0 : dimensiion1;
    console.log(datadjgfhjk)
    console.log(inputData.freight)
    // ////////////////////////////////////////////////////get contries////////////////////////////////////////////////////
    const getdata12 = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}country-list`).then((response) => {
            setCountry(response.data.data)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }
    useEffect(() => {
        getdata12()
    }, []);
    console.log(inputData.delivery_to)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, [name]: value })
    }
    console.log(inputData.collection_address)
    const totaldimension = inputData.dimension * inputData.weight

    const handlenavi = () => {
        navigate('/message')
    }
    const data122 = (inputData?.delivery_to)
    console.log(typeof (data122))

    console.log(inputData.delivery_to)
    return (
        <div>
            <>
                <Topbar />
                <Navbar />
                {
                    currentuser !== null || undefined ? (
                        <>
                            <section
                                className="bannerBg"  >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h1> Freight Details</h1>
                                            <h5>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. illo quae
                                                vero{" "}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="manageFrightSec  pt80">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <p className='fw-bold fs-2 mx-2 text-center' style={{ color: "#212529" }}>Freight Details</p>
                                            <div className='d-flex mx-2 justify-content-between'>
                                                <div>
                                                    <input className='ms-auto my-3 py-2 px-2 mx-2 rounded border' value={searchQuery}
                                                        onChange={handleSearch} placeholder='Search freight...'></input>
                                                </div>
                                                <div>
                                                    <div class="dropdown mt-4">
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Shipment</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={age}
                                                                    label="Age"
                                                                    onChange={handleChange}
                                                                >
                                                                    <MenuItem value={"0"}>Pending</MenuItem>
                                                                    <MenuItem value={1}>Accepted</MenuItem>
                                                                    <MenuItem value={2}>Declined</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tableManageFright mainTableClearnce  rounded p-2">
                                                <table className="w-100">
                                                    <thead style={{ borderTop: "2px solid #f2f2f2" }}>
                                                        <tr>
                                                            <th scope="col">Freight ID</th>
                                                            <th scope="col">Origin / Destination</th>
                                                            <th scope="col">Freight</th>
                                                            <th scope="col">Costumer Ref*</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            currentdata && currentdata.length > 0 && currentdata.map((item, index) => {
                                                                console.log(item)
                                                                const date = new Date(item.date)
                                                                const formatteddate = date.toLocaleDateString("en-GB", {
                                                                    day: "numeric",
                                                                    month: "numeric",
                                                                    year: "numeric"
                                                                })
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className='col-2' onClick={() => { handleclicknavigfh(item.id) }}>{item.freight_number}</td>
                                                                        <td className='col-2' onClick={() => { handleclicknavigfh(item.id) }}>{item?.collection_from_country} / {item?.delivery_to_country}</td>
                                                                        <td className='col-2 ps-3' onClick={() => { handleclicknavigfh(item.id) }}>{item?.freight}</td>
                                                                        <td className='col-2' onClick={() => { handleclicknavigfh(item.id) }}>{item?.shipment_ref}</td>
                                                                        <td className='col-2' onClick={() => { handleclicknavigfh(item.id) }}>{item.status == 0 ? (<p className='text-dark mt-2'>Pending</p>) : (item.status == 2 ? (<p className='text-danger mt-2'>Declined</p>) : (item.status == 3 ? ('Rejected') : (item.status == 4 ? (<p>Estimated</p>) : (item.status == 1 ? (<p>Accepted</p>) : ("ghgh")))))}</td>
                                                                        <td>
                                                                            <div className="dropdown">
                                                                                <button
                                                                                    className="editModalBtn  dropdown-toggle"
                                                                                    type="button"
                                                                                    data-bs-toggle="dropdown"
                                                                                    aria-expanded="false"
                                                                                >
                                                                                </button>
                                                                                <ul className="dropdown-menu cusTomTable ">
                                                                                    <div className="btnManageFreight d-flex">
                                                                                        <div>
                                                                                            {item?.status === 4 ? (
                                                                                                <Link className='text-primary' onClick={() => { hanldedhgjdh(item.id) }}>
                                                                                                    <i
                                                                                                        class=
                                                                                                        "fi fi-br-download"
                                                                                                    ></i>
                                                                                                </Link>
                                                                                            ) : (
                                                                                                <Link className='text-danger'>
                                                                                                </Link>
                                                                                            )}

                                                                                        </div>
                                                                                        <div>
                                                                                            <i onClick={() => { handlenavi() }}><MessageIcon /></i>
                                                                                        </div>
                                                                                        <div>
                                                                                            <i className="fa fa-trash" onClick={() => { handledelete(item.id) }} />
                                                                                        </div>
                                                                                        {
                                                                                            item.status === 2 ?
                                                                                                (<p></p>)
                                                                                                : (<div>
                                                                                                    <i type="button"
                                                                                                        className="fa fa-edit"
                                                                                                        data-bs-toggle="modal"
                                                                                                        data-bs-target="#exampleModal"
                                                                                                        onClick={() => { handleupdate(item.id) }} />
                                                                                                </div>)
                                                                                        }
                                                                                    </div>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className='mt-4'>
                                                    <button disabled={currentPage === 1} className='btn rounded' style={{ backgroundColor: "red", color: "white" }} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                                    <span>{`Page ${currentPage} of ${totalPage}`}</span>
                                                    <button disabled={currentPage === totalPage} className='btn rounded' style={{ backgroundColor: "#011324", color: "white" }} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            <p className='text-center fw-bold fs-1 my-5'>
                                !!! Please
                                Login !!!
                            </p>
                            <div className='text-center'>
                                <button className='btn btn-secondary  px-5 py-2' onClick={() => { navigate('/login') }}>login</button>
                            </div>
                        </>)
                }
                <Footer />
            </>
            <ToastContainer />
            <div
                className="modal fade "
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold text-dark" id="exampleModalLabel">
                                Update freight
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <section className="frightFormSec manageModal pt80 pb80">
                                <div className='frightFormSec pt50 pb50'>
                                    <div className="container">
                                        <div className="row">
                                            <h1>Shipment Details</h1>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className='col-lg-12 d-flex my-2'>
                                                    <div className='col-lg-6'>
                                                        <h5>Freight Option</h5>
                                                        <select name="freight" onChange={handklechangeas} id="freightOption" value={inputData.freight}>
                                                            <option value="">Select...</option>
                                                            <option value="Sea">Sea</option>
                                                            <option value="Air">Air</option>
                                                            <option value="Road">Road</option>
                                                            <option value="Rail">Rail</option>
                                                        </select>
                                                        <p className='text-danger'></p>
                                                    </div>
                                                </div>

                                                <div className='mt-3 col-lg-6'>
                                                    <h5>Freight Options</h5>
                                                    <select name="freight_type" onChange={handklechangeas} value={inputData.freight_type}>
                                                        <option value="">Select...</option>
                                                        <option value="express">Express</option>
                                                        <option value="normal">Normal</option>
                                                    </select>
                                                </div>
                                                <div className="borderShip">
                                                    <h3 className='mb-4'>Shipment details</h3>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <h5>Origin</h5>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='origin' onChange={secondradi} checked={secondRadio === "Shipper will deliver at Asia Direct - Africa warehouse"} value="Shipper will deliver at Asia Direct - Africa warehouse" />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Shipper will deliver at Asia Direct - Africa warehouse</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='origin' onChange={secondradi} value="Asia Direct will collect from shipper address" checked={secondRadio === "Asia Direct will collect from shipper address"} />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Asia Direct will collect from shipper address</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='origin' onChange={secondradi} value="Shipper will deliver to the port of loading" checked={secondRadio === "Shipper will deliver to the port of loading"} />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Shipper will deliver to the port of loading,</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='origin' onChange={secondradi} value="Shipper will deliver and facilitate export at the Port of loading" checked={secondRadio === "Shipper will deliver and facilitate export at the Port of loading"} />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Shipper will deliver and facilitate export at the Port of loading</p>
                                                                </div>
                                                            </div>
                                                            <p className='text-danger'></p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <h5>Destination</h5>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='Destination' onChange={handlethird} checked={thirdRadio === "Asia Direct will deliver to the Address"} value="Asia Direct will deliver to the Address" />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Asia Direct will deliver to the Address.</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='Destination' onChange={handlethird} checked={thirdRadio === "Consignee will collect at Asia Direct - Africa warehouse"} value="Consignee will collect at Asia Direct - Africa warehouse" />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Consignee will collect at Asia Direct - Africa warehouse</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='Destination' onChange={handlethird} value="Consignee will collect at the nearest port" checked={thirdRadio === "Consignee will collect at the nearest port"} />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Consignee will collect at the nearest port</p>
                                                                </div>
                                                            </div>
                                                            <div className="parentShipper">
                                                                <div className='childshipper'>
                                                                    <input type="radio" name='Destination' onChange={handlethird} checked={thirdRadio === "Consignee will collect and facilitate import at destination port"} value="Consignee will collect and facilitate import at destination port" />
                                                                </div>
                                                                <div className="childshipper ms-3">
                                                                    <p>Consignee will collect and facilitate import at destination port</p>
                                                                </div>
                                                            </div>
                                                            <p className='text-danger'></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="borderShip">
                                                    <h3 className='mb-4'>Your Shipment reference</h3>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="col-lg-6 my-3">
                                                                <h5>Your Customer Reference</h5>
                                                                <input type="text" onChange={handklechangeas} name="shipment_ref" value={inputData.shipment_ref} />
                                                            </div>
                                                            <div className="shipRefer">
                                                                <h5>Are you the </h5>
                                                                <input type="radio" id="shipper" name="shipper" value="shipper" checked={radioButton === "shipper"} onChange={dddd} />
                                                                <label htmlFor="shipper">Shipper</label>
                                                                <input type="radio" id="consignee" name="shipperOrConsignee" value="consignee" checked={radioButton === "consignee"} onChange={dddd} />
                                                                <label htmlFor="consignee">Consignee</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="borderShip">
                                                    <div>
                                                        <h3 className='mb-4 '>Location details</h3>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="col-lg-12 ms-2">
                                                                <h5>Collection from</h5>
                                                                <select value={inputData.collection_from} name='collection_from' onChange={handleInputChange} >
                                                                    {country.map((option, index) => {
                                                                        console.log(typeof (option.id))
                                                                        return (
                                                                            <>
                                                                                <option key={index} value={option.id}>
                                                                                    {option.country_of_origin}
                                                                                </option>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <p className='text-danger'></p>
                                                            </div>
                                                            <div className="col-lg-12 my-1">
                                                                <h5>Port of Loading</h5>
                                                                <input type="text" name="port_of_loading" onChange={handleInputChange} value={inputData.port_of_loading} />
                                                            </div>
                                                            <div className='my-3'>
                                                                <h5>Collection Address</h5>
                                                                <input type="text" name="collection_address" onChange={handleInputChange} value={inputData.collection_address} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <h5>Delivery To</h5>
                                                            <select value={inputData.delivery_to} name='delivery_to' onChange={handleInputChange} >
                                                                {country.map((option, index) => {
                                                                    console.log(typeof (option.id))
                                                                    return (
                                                                        <>
                                                                            <option key={index} value={option.id}>
                                                                                {option.country_of_origin}
                                                                            </option>
                                                                        </>
                                                                    )
                                                                })}
                                                            </select>
                                                            <p className='text-danger'></p>
                                                            <div className='my-3'>
                                                                <h5>Port of Discharge</h5>
                                                                <input type="text" onChange={handleInputChange} name="post_of_discharge" value={inputData.post_of_discharge} />
                                                            </div>
                                                            <div className="col-lg-12 my-3">
                                                                <h5>Delivery Address</h5>
                                                                <input type="text" onChange={handleInputChange} name="delivery_address" value={inputData.delivery_address} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="borderShip">
                                                    <h3 className='mb-4'>Cargo details</h3>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="shipRefer col-lg-12">
                                                                <h5>Product Description</h5>
                                                                <input type='text' onChange={handleInputChange} name="product_desc" value={inputData.product_desc} className='w-100' />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 ">
                                                            <h5>Nature of Goods</h5>
                                                            <select name="nature_of_goods" onChange={handleInputChange} value={inputData.nature_of_goods}>
                                                                <option value="">Select...</option>
                                                                <option value="generalCargo">General cargo</option>
                                                                <option value="battery">Battery</option>
                                                                <option value="liquids">Liquids</option>
                                                                <option value="powders">Powders</option>
                                                                <option value="hazardous">Hazardous</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6 mt-3">
                                                            <h5>Package Type</h5>
                                                            <select name="package_type" onChange={handleInputChange} value={inputData.package_type}>
                                                                <option value="">Select...</option>
                                                                <option value="box">Box</option>
                                                                <option value="crate">Crate</option>
                                                                <option value="pallet">Pallet</option>
                                                                <option value="bags">Bags</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <h5>Total Packages</h5>
                                                            <input type='text' name="no_of_packages" onChange={handleInputChange} value={inputData.no_of_packages} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6 mt-3">
                                                            <h5>Total Dimension</h5>
                                                            <input type='text' name="dimension" onChange={handleInputChange} value={inputData.dimension} />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <h5>Total Weight</h5>
                                                            <input type="text" name="weight" onChange={handleInputChange} value={inputData.weight} />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <h5>Auto Calculate</h5>
                                                            <input type="text" name="autoCalculate" onChange={handleInputChange} value={totaldimension} />
                                                        </div>
                                                        <div className="col-lg-12 mt-3">
                                                            <h5>Add attachments</h5>
                                                            <select name="add_attachments" value={inputData.add_attachments} onChange={handleInputChange}>
                                                                <option value="">Select...</option>
                                                                <option value="supplierInvoice">Supplier Invoice / Quotation / Proforma Invoice</option>
                                                                <option value="packingList">Packing List</option>
                                                                <option value="licenses">Licenses/Permits</option>
                                                                <option value="otherDocuments">Other documents</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-12 mt-3">
                                                            <h5>Comment</h5>
                                                            <input type="text" name="comment" className='mb-3' onChange={handleInputChange} value={inputData.comment} />
                                                        </div>
                                                        <button type="submit" className='btn btn-danger mt-3 w-25' onClick={handleclicknavi} >Update Freight</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ToastContainer />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}