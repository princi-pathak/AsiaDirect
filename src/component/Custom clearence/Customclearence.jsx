import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar'
import Navbar from '../homepage/Navbar'
import Footer from '../homepage/Footer'
import image1 from '../../assestss/slide3.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

const pageSize = 5;
export default function Customclearence() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = data.filter(item => {
        console.log(item)
        return item.client.toLowerCase().includes(searchQuery.toLowerCase())||
         item.goods_desc.toLowerCase().includes(searchQuery.toLowerCase())||
         item.destination.toLowerCase().includes(searchQuery.toLowerCase())||
         item.port_of_entry.toLowerCase().includes(searchQuery.toLowerCase())
    });
    const totalPage = Math.ceil(filteredData.length / pageSize);
    const startindex = (currentPage - 1) * pageSize;
    const endIndex = startindex + pageSize;
    const currentdata = filteredData.slice(startindex, endIndex);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const getdata = JSON.parse(localStorage.getItem('data'))
    const getdatat = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}get-client-clearing`, { user_id: getdata.id }).then((response) => {
            setData(response.data.data)
        }).catch((error) => {
            console.log(error.response.data.messgae)
        })
    }
    useEffect(() => {
        window.scrollTo(0,0)
        getdatat()
    }, [])

    ////////////////////////////////////////////////////update clearence ///////////////////////

    const [predata, setPredata] = useState({})
    const handleidvali = (id) => {
        console.log(id)
        const useridche = data.filter((item) => {
            return item.id === id
        })
        const userdata = useridche[0]
        console.log(userdata)
        console.log(userdata.id)
        setPredata((prevData) => ({
            ...prevData,
            clearing_id: userdata.id,
            trans_reference: userdata.trans_reference,
            client: userdata.client,
            customer_ref: userdata.customer_ref,
            goods_desc: userdata.goods_desc,
            destination: userdata.destination,
            port_of_entry: userdata.port_of_entry,
            port_of_exit: userdata.port_of_exit,
            clearing_agent: userdata.clearing_agent,
            clearing_status: userdata.clearing_status,
            clearing_result: userdata.clearing_result,
            document_req: userdata.document_req,
            document: userdata.document,
            sad500: userdata.sad500,
            comment_on_docs: userdata.comment_on_docs
        }))
    }
    const hanldechange = (e) => {
        const { name, value } = e.target
        setPredata({ ...predata, [name]: value })
    }
    const updatedata = () => {
        const formdata = new FormData()
        formdata.append('clearing_id', predata.clearing_id)
        formdata.append('trans_reference', predata.trans_reference)
        formdata.append('client', predata.client)
        formdata.append('customer_ref', predata.customer_ref)
        formdata.append('goods_desc', predata.goods_desc)
        formdata.append('destination', predata.destination)
        formdata.append('port_of_entry', predata.port_of_entry)
        formdata.append('port_of_exit', predata.port_of_exit)
        formdata.append('clearing_agent', predata.clearing_agent)
        formdata.append('clearing_status', predata.clearing_status)
        formdata.append('clearing_result', predata.clearing_result)
        formdata.append('document_req', predata.document_req)
        formdata.append('document', predata.document)
        formdata.append('sad500', predata.sad500)
        formdata.append('comment_on_docs', predata.comment_on_docs)
        axios.post(`${process.env.REACT_APP_BASE_URL}update-clearing`, formdata).then((response) => {
            getdatat()
            toast.success(response.data.message)
            console.log(response.data)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }
    const handleclicknavi = (id) => {
        const userdata1 = data.filter((item) => {
            return item.id === id
        })
        console.log(userdata1)
        navigate('/clearence-details', { state: { data: userdata1[0] } })
    }
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setPredata({ ...predata, [name]: files[0] });
    };
    console.log(predata)

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
                axios.post(`${process.env.REACT_APP_BASE_URL}delete-clearing`, { clearing_id: id }).then((response) => {
                    getdatat()
                    toast.success(response.data.message)
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

    const handledeleteclearenceid = (id) => {
        navigate('/calculate-clearence', { state: { data: id } })
    }

    return (
        <div>
            <Topbar />
            <Navbar />
            <>
                <section
                    className="bannerBg"
                    style={{ backgroundImage: `url(${image1})` }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1>Custom Clearance</h1>
                                <h5>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. illo quae
                                    vero{" "}
                                </h5>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    data.length == 0 ? (<div >
                        {/* <button className='btn  btn-danger ' onClick={() => { navigate('/Add-Custom-clearence') }}>Add clearance</button> */}
                    </div>) : (
                        <div className=' container d-flex justify-content-between mt-5'>
                            <div>
                                <input className='px-2 my-3 py-2 rounded customSearch' value={searchQuery}
                                    onChange={handleSearch} placeholder='Search freight...'></input>
                            </div>
                            <div>
                                <button className='btn  btn-danger mt-3' onClick={() => { navigate('/Add-Custom-clearence') }}>Add clearance</button>
                            </div>
                        </div>
                    )
                }
                {
                    data.length == 0 ? (
                        <p className='text-center fs-1 fw-bold  my-5'>no data</p>
                    ) : (
                        <>
                            <section className="manageFrightSec pt80 mt-4">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="tableManageFright mainTableClearnce table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr NO</th>
                                                            <th>Good Description</th>
                                                            <th>Destination </th>
                                                            <th>Port of Entry </th>
                                                            {/* <th>View</th> */}
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            currentdata && currentdata.length > 0 && currentdata.map((item, index) => {
                                                                console.log(item)
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td onClick={() => { handleclicknavi(item?.id) }}>{startindex + index + 1}</td>
                                                                            <td onClick={() => { handleclicknavi(item?.id) }}>{item.goods_desc}</td>
                                                                            <td onClick={() => { handleclicknavi(item?.id) }} >{item.destination}</td>
                                                                            <td onClick={() => { handleclicknavi(item?.id) }}>{item.port_of_entry}</td>
                                                                            <td><div class="dropdown">
                                                                                <button class="dropdown-toggle editModalBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                  
                                                                                </button>
                                                                                <ul class="dropdown-menu cusTomTable">
                                                                                    <div className="btnManageFreight ">

                                                                                        {/* <i className="fa fa-eye" onClick={() => { handleclicknavi(item?.id) }} /> */}

                                                                                        <i className="fa fa-trash" onClick={() => { handledelete(item.id) }} />
                                                                                        <i className="fi fi-rr-calculator" onClick={() => { handledeleteclearenceid(item.id) }} />
                                                                                        <i
                                                                                            type="button"
                                                                                            className="fa fa-edit"
                                                                                            data-bs-toggle="modal"
                                                                                            data-bs-target="#exampleModal"
                                                                                            onClick={() => { handleidvali(item.id) }}
                                                                                        >

                                                                                        </i>

                                                                                    </div>
                                                                                </ul>
                                                                            </div></td>




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
                                                    <button disabled={currentPage === totalPage} className='btn rounded' style={{ backgroundColor: "#011324", color: "white" }} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* edit  Modal */}
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                Update Custom Clearance
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <section className='frightFormSec pt80 pb80'>
                                                <div className="container">
                                                    {/* <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Trans Refrence</label>
                                                            <input type='text' className="form-control" value={predata.trans_reference} onChange={hanldechange} name='trans_reference' />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Client</label>
                                                            <input type='text' className="form-control" value={predata.client} onChange={hanldechange} name='client' placeholder='client id' />
                                                        </div>
                                                    </div> */}
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Customer Refrenceef</label>
                                                            <input type='text' className="form-control" value={predata.customer_ref} onChange={hanldechange} name='customer_ref' />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Goods Description</label>
                                                            <input type='text' className="form-control" value={predata.goods_desc} onChange={hanldechange} name='goods_desc' placeholder='client id' />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Destination</label>
                                                            <input type='text' className="form-control" value={predata.destination} onChange={hanldechange} name='destination' />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Port of Entry</label>
                                                            <input type='text' className="form-control" value={predata.port_of_entry} onChange={hanldechange} name='port_of_entry' placeholder='client id' />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Port of Exit</label>
                                                            <input type='text' className="form-control" value={predata.port_of_exit} onChange={hanldechange} name='port_of_exit' />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Clearing Status</label>
                                                            <input type='text' className="form-control" value={predata.clearing_status} onChange={hanldechange} name='clearing_status' />
                                                        </div>
                                                        {/* <div className="col">
                                                            <label htmlFor="" className='text-dark'>Clearing Agent</label>
                                                            <input type='text' className="form-control" value={predata.clearing_agent} onChange={hanldechange} name='clearing_agent' placeholder='client id' />
                                                        </div> */}
                                                    </div>
                                                    <div className="row">
                                                       
                                                        <div className="col">
                                                            <label htmlFor="" className='text-dark'>Document</label>
                                                            <input type='file' className="form-control" onChange={handleFileChange} name='document' placeholder='client id' />
                                                            {predata.document && <img src={`${process.env.REACT_APP_BASE_URL_image}${predata.document}`} alt="Selected Image" style={{ width: "20px", height: "20px" }} />}
                                                            <img src={predata.document && URL.createObjectURL(predata.document)} alt="Selected Image" style={{ width: "20px", height: "20px" }} />
                                                        </div>
                                                        {/* <div className="col">
                                                            <label htmlFor="" className='text-dark'>Clearing Result</label>
                                                            <input className="form-control" value={predata.clearing_result} onChange={hanldechange} name='clearing_result' placeholder='client id' />
                                                        </div> */}
                                                    </div>
                                                    <div className="row">
                                                        {/* <div className="col">
                                                            <label htmlFor="" className='text-dark'>document_req</label>
                                                            <input className="form-control" value={predata.document_req} onChange={hanldechange} name='document_req' />
                                                        </div> */}
                                                       
                                                    </div>
                                                    <div className="row">

                                                        {/* <div className="col">
                                                            <label htmlFor="" className='text-dark'>Sad 500</label>
                                                            <input type='file' className="form-control" onChange={handleFileChange} name='sad500' placeholder='client id' />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={updatedata}>
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* edit modal end */}
                        </>
                    )
                }
            </>
            <Footer />
            <ToastContainer />
        </div>
    )
}
