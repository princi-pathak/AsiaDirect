import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function AddFreight() {
    const [showSeaOptions, setShowSeaOptions] = useState(false);
    const [showRoadOptions, setShowRoadOptions] = useState(false);
    const [showAirOptions, setShowAirOptions] = useState(false);
    const [error, setError] = useState({});
    const [showRailOptions, setShowRailOptions] = useState(false);
    const [country, setCountry] = useState([]);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        freightOption: '',
        collectionFrom: '',
        seaOption: '',
        roadOption: '',
        expressOrNormal: '',
        origin: "",
        country: "",
        document: [],
        destination: "",
        customerReference: '',
        shipperOrConsignee: '',
        portOfLoading: '',
        collectionAddress: '',
        portOfDischarge: '',
        deliveryAddress: '',
        productDescription: '',
        totalPackages: '',
        totalDimension: '',
        natureOfGoods: '',
        packageType: '',
        totalWeight: '',
        autoCalculate: '',
        attachmentType: '',
        comment: '',
        attachments: ""
    });
    const getdata = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}country-list`).then((response) => {
            setCountry(response.data.data)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }
    useEffect(() => {
        getdata()
    }, []);
    const handleFreightOptionChange = (event) => {
        const value = event.target.value;
        console.log(event.target.value)
        setShowSeaOptions(value === 'Sea');
        setShowRoadOptions(value === 'Road');
        setShowAirOptions(value === 'Air');
        setShowRailOptions(value === 'rail');
        setFormData({ ...formData, freightOption: value });
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        setFormData({ ...formData, attachments: files });
    };
    const handleclicksubmit = () => {
        handlevalidfate(formData)
    }
    const handlevalidfate = (value) => {
        let error = {};
        if (!value.freightOption) {
            error.freightOption = "Fright is Required"
        } if (!value.origin) {
            error.origin = "origin is required"
        } if (!value.Destination) {
            error.Destination = "Destination is required"
        } if (!value.collectionFrom) {
            error.collectionFrom = "Collection country is required is required"
        } if (!value.country) {
            error.country = "country is required"
        }
        else {
            apihit()
        }
        setError(error)
    }
    const totalcalc = formData.totalDimension * formData.totalWeight
    console.log(totalcalc)
    const apihit = () => {
        const data = new FormData();
        data.append('client_id', JSON.parse(localStorage.getItem('data'))?.id);
        data.append('product_desc', formData.productDescription);
        data.append('nature_of_goods', formData.natureOfGoods);
        data.append('delivery_address', formData.deliveryAddress);
        data.append('freight', formData.freightOption);
        data.append('freight_type', formData.expressOrNormal);
        data.append('no_of_packages', formData.totalPackages);
        data.append('weight', formData.totalWeight);
        data.append('dimension', formData.totalDimension);
        data.append('comment', formData.comment);
        data.append('port_of_loading', formData.portOfLoading);
        data.append('auto_calculate', totalcalc);
        data.append('package_type', formData.packageType);
        data.append('post_of_discharge', formData.portOfDischarge);
        data.append('add_attachments', formData.attachmentType);
        data.append('sea_freight_option', formData.seaOption);
        data.append('road_freight_option', formData.roadOption);
        data.append('shipment_origin', formData.origin);
        data.append('shipment_des', formData.Destination);
        data.append('collection_from', formData.country);
        data.append('delivery_to', formData.collectionFrom);
        data.append('shipment_ref', formData.customerReference);
        data.append('user_type', formData.shipperOrConsignee);
        data.append('collection_address', formData.collectionAddress);
        for (let i = 0; i < formData.attachments.length; i++) {
            data.append('document', formData.attachments[i]);
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}freight-add`, data).then((response) => {
            console.log(response.data)
            toast.success(response.data.message)
            if (response.data.success === true) {
                setTimeout(() => {
                    navigate('/freight-details')
                }, [1500])
            } else {
                toast.error("something went wrong")
            }
        }).catch((error) => {
            console.log(error.response.data)
        })
    }
    // const handlekey12 = (e) => {
    //     if (e.charCode < 46 || e.charCode > 57) {
    //         e.preventDefault();
    //     }
    // }
    const handlekey12 = (e)=>{
        if(e.charCode<46 || e.charCode>57){
            e.preventDefault();
        }
    }

    const handleclickprevious =() =>{
        navigate('/freight-details')
    }
    return (
        <div className='frightFormSec pt50 pb50'>
            <div className="container">
                <div className="row">
                    <h1>Shipment Details</h1>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className='col-lg-12 d-flex my-2'>
                            <div className='col-lg-6'>
                                <h5>Freight Type</h5>
                                <select name="freightOption" id="freightOption" onChange={handleFreightOptionChange}>
                                    <option value="">Select...</option>
                                    <option value="Sea">Sea</option>
                                    <option value="Air">Air</option>
                                    <option value="Road">Road</option>
                                    <option value="Rail">Rail</option>
                                </select>
                                <p className='text-danger'>{error.freightOption}</p>
                            </div>
                            {showSeaOptions && (
                                <div className='ms-2 col-lg-6'>
                                    <h5>Sea Freight Options</h5>
                                    <select name="seaOption" id="seaOption" onChange={handleInputChange}>
                                        <option value="">Select...</option>
                                        <option value="fullContainer">Full Container</option>
                                        <option value="lessThanContainer">Less than Container Size</option>
                                    </select>
                                </div>
                            )}
                            {showRoadOptions && (
                                <div className='ms-2 col-lg-6'>
                                    <h5>Road Freight Options</h5>
                                    <select name="roadOption" id="roadOption" onChange={handleInputChange}>
                                        <option value="">Select...</option>
                                        <option value="fullLoad">Full Load</option>
                                        <option value="smallCargo">Small Cargo for Console</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='mt-3 col-lg-6'>
                            <h5>Freight Options</h5>
                            <select name="expressOrNormal" onChange={handleInputChange}>
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
                                            <input type="radio" onChange={handleInputChange} name='origin' value="Shipper will deliver at Asia Direct - Africa warehouse" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Shipper will deliver at Asia Direct - Africa warehouse</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='origin' value="Asia Direct will collect from shipper address" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Asia Direct will collect from shipper address</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='origin' value="Shipper will deliver to the port of loading" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Shipper will deliver to the port of loading,</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='origin' value="Shipper will deliver and facilitate export at the Port of loading" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Shipper will deliver and facilitate export at the Port of loading</p>
                                        </div>
                                    </div>
                                    <p className='text-danger'>{error.origin}</p>
                                </div>
                                <div className="col-lg-6">
                                    <h5>Destination</h5>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='Destination' value="Asia Direct will deliver to the Address" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Asia Direct will deliver to the Address.</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='Destination' value="Consignee will collect at Asia Direct - Africa warehouse" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Consignee will collect at Asia Direct - Africa warehouse</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='Destination' value="Consignee will collect at the nearest port" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Consignee will collect at the nearest port</p>
                                        </div>
                                    </div>
                                    <div className="parentShipper">
                                        <div className='childshipper'>
                                            <input type="radio" onChange={handleInputChange} name='Destination' value="Consignee will collect and facilitate import at destination port" />
                                        </div>
                                        <div className="childshipper ms-3">
                                            <p>Consignee will collect and facilitate import at destination port</p>
                                        </div>
                                    </div>
                                    <p className='text-danger'>{error.Destination}</p>
                                </div>
                            </div>
                        </div>
                        <div className="borderShip">
                            <h3 className='mb-4'>Your Shipment reference</h3>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="col-lg-6 my-3">
                                        <h5>Your Customer Reference</h5>
                                        <input type="text" name="customerReference" onChange={handleInputChange} />
                                    </div>
                                    <div className="shipRefer">
                                        <h5>Are you the </h5>
                                        <input type="radio" id="shipper" name="shipperOrConsignee" value="shipper" onChange={handleInputChange} />
                                        <label htmlFor="shipper">Shipper</label>
                                        <input type="radio" id="consignee" name="shipperOrConsignee" value="consignee" onChange={handleInputChange} />
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
                                        <select name="collectionFrom" onChange={handleInputChange}>
                                            <option>Select...</option>
                                            {
                                                country && country.length > 0 && country.map((item, index) => {
                                                    console.log(item)
                                                    return (
                                                        <>
                                                            <option key={index} value={item.id}>{item.country_of_origin}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className='text-danger'>{error.collectionFrom}</p>
                                    </div>
                                    <div className="col-lg-12 my-1">
                                        <h5>Port of Loading</h5>
                                        <input type="text" name="portOfLoading" onChange={handleInputChange} />
                                    </div>
                                    <div className='my-3'>
                                        <h5>Collection Address</h5>
                                        <input type="text" name="deliveryAddress" onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h5>Delivery To</h5>
                                    <select name="country" onChange={handleInputChange}>
                                        <option>Select...</option>
                                        {
                                            country && country.length > 0 && country.map((item, index) => (
                                                <option key={index} value={item.id}>{item.country_of_origin}</option>
                                            ))
                                        }
                                    </select>
                                    <p className='text-danger'>{error.country}</p>
                                    <div className='my-3'>
                                        <h5>Port of Discharge</h5>
                                        <input type="text" name="portOfDischarge" onChange={handleInputChange} />
                                    </div>
                                    <div className="col-lg-12 my-3">
                                        <h5>Delivery Address</h5>
                                        <input type="text" name="collectionAddress" onChange={handleInputChange} />
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
                                        <input type='text' name="productDescription" className='w-100' onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <h5>Nature of Goods</h5>
                                    <select name="natureOfGoods" onChange={handleInputChange}>
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
                                    <select name="packageType" onChange={handleInputChange}>
                                        <option value="">Select...</option>
                                        <option value="box">Box</option>
                                        <option value="crate">Crate</option>
                                        <option value="pallet">Pallet</option>
                                        <option value="bags">Bags</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <h5>Total Packages</h5>
                                    <input type='text' onKeyPress={handlekey12} name="totalPackages" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                                    <h5>Total Dimension</h5>
                                    <input type='text' onKeyPress={handlekey12} name="totalDimension" onChange={handleInputChange} />
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <h5>Total Weight</h5>
                                    <input type="text" onKeyPress={handlekey12} name="totalWeight" onChange={handleInputChange} />
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <h5>Auto Calculate</h5>
                                    <input type="text" value={totalcalc.toFixed(2)} name="autoCalculate" onChange={handleInputChange} />
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <h5>Add attachments</h5>
                                    <input type="file" name="attachments" className='mb-3' onChange={handleFileChange} multiple />
                                    <select name="attachmentType" onChange={handleInputChange}>
                                        <option value="">Select...</option>
                                        <option value="supplierInvoice">Supplier Invoice / Quotation / Proforma Invoice</option>
                                        <option value="packingList">Packing List</option>
                                        <option value="licenses">Licenses/Permits</option>
                                        <option value="otherDocuments">Other documents</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <h5>Comment</h5>
                                    <input type="text" name="comment" className='mb-3' onChange={handleInputChange} />
                                </div>
                                <button type="submit" className='btn btn-danger mt-3 w-25' onClick={handleclicksubmit}>Add Freight</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="bookingProcess">
                            <h5>Speed up your booking process by reusing details from a previous booking</h5>
                            <button onClick={handleclickprevious} className='shadow'>Show Previous Booking</button>
                        </div>
                        <div className="contractSec">
                            <p>
                                <i className="fi fi-rr-exclamation"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vitae, rerum et, adipisci quos, minus ea quis impedit corporis harum debitis.
                            </p>
                        </div>
                        <div className="checkOffers">
                            <h5>Check Asia Direct offers for your next vessel</h5>
                            <h6>Please enter your location and container details to see the offers.</h6>
                            <ul>
                                <li><i className="fi fi-rs-usd-circle"></i> <span>Fixed price at booking</span> </li>
                                <li> <i className="fi fi-rr-loading"></i> <span>Loading Guarantee</span> </li>
                                <li><i className="fi fi-rr-shuffle"></i><span>Changes and cancellations Possible for a fee</span> </li>
                                <p>Spot rate is not applicable for our contract customers</p>
                            </ul>
                        </div>
                        <div className="checkOffers">
                            <h5>Check Asia Direct offers for your next vessel</h5>
                            <h6>Please enter your location and container details to see the offers.</h6>
                            <ul>
                                <li><i className="fi fi-rs-usd-circle"></i> <span>Fixed price at booking</span> </li>
                                <li> <i className="fi fi-rr-loading"></i> <span>Loading Guarantee</span> </li>
                                <li><i className="fi fi-rr-shuffle"></i><span>Changes and cancellations Possible for a fee</span> </li>
                                <p>Spot rate is not applicable for our contract customers</p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function AddFreight() {
//     const [showSeaOptions, setShowSeaOptions] = useState(false);
//     const [showRoadOptions, setShowRoadOptions] = useState(false);
//     const [showAirOptions, setShowAirOptions] = useState(false);
//     const [showRailOptions, setShowRailOptions] = useState(false);
//     const [error, setError] = useState({});
//     const [country, setCountry] = useState([]);
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         freightOption: '',
//         collectionFrom: '',
//         seaOption: '',
//         roadOption: '',
//         expressOrNormal: '',
//         origin: "",
//         country: "",
//         document: [],
//         destination: "",
//         customerReference: '',
//         shipperOrConsignee: '',
//         portOfLoading: '',
//         collectionAddress: '',
//         portOfDischarge: '',
//         deliveryAddress: '',
//         productDescription: '',
//         totalPackages: '',
//         totalDimension: '',
//         natureOfGoods: '',
//         packageType: '',
//         totalWeight: '',
//         autoCalculate: '',
//         attachmentType: '',
//         comment: '',
//         attachments: ""
//     });

//     const getdata = () => {
//         axios.get(`${process.env.REACT_APP_BASE_URL}country-list`).then((response) => {
//             setCountry(response.data.data)
//         }).catch((error) => {
//             console.log(error.response.data)
//         })
//     }

//     useEffect(() => {
//         getdata()
//     }, []);

//     const handleFreightOptionChange = (event) => {
//         const value = event.target.value;
//         setShowSeaOptions(value === 'Sea');
//         setShowRoadOptions(value === 'Road');
//         setShowAirOptions(value === 'Air');
//         setShowRailOptions(value === 'Rail');
//         setFormData({ ...formData, freightOption: value });
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (event) => {
//         const files = event.target.files;
//         setFormData({ ...formData, attachments: files });
//     };

//     const handleclicksubmit = () => {
//         handlevalidfate(formData)
//     }

//     const handlevalidfate = (value) => {
//         let error = {};
//         if (!value.freightOption) {
//             error.freightOption = "Fright is Required"
//         } if (!value.origin) {
//             error.origin = "origin is required"
//         } if (!value.Destination) {
//             error.Destination = "Destination is required"
//         } if (!value.collectionFrom) {
//             error.collectionFrom = "Collection country is required is required"
//         } if (!value.country) {
//             error.country = "country is required"
//         }
//         else {
//             apihit()
//         }
//         setError(error)
//     }

//     const totalcalc = formData.totalDimension * formData.totalWeight
//     console.log(totalcalc)

//     const apihit = () => {
//         const data = new FormData();
//         data.append('client_id', JSON.parse(localStorage.getItem('data'))?.id);
//         data.append('product_desc', formData.productDescription);
//         data.append('nature_of_goods', formData.natureOfGoods);
//         data.append('delivery_address', formData.deliveryAddress);
//         data.append('freight', formData.freightOption);
//         data.append('freight_type', formData.expressOrNormal);
//         data.append('no_of_packages', formData.totalPackages);
//         data.append('weight', formData.totalWeight);
//         data.append('dimension', formData.totalDimension);
//         data.append('comment', formData.comment);
//         data.append('port_of_loading', formData.portOfLoading);
//         data.append('auto_calculate', totalcalc);
//         data.append('package_type', formData.packageType);
//         data.append('post_of_discharge', formData.portOfDischarge);
//         data.append('add_attachments', formData.attachmentType);
//         data.append('sea_freight_option', formData.seaOption);
//         data.append('road_freight_option', formData.roadOption);
//         data.append('shipment_origin', formData.origin);
//         data.append('shipment_des', formData.Destination);
//         data.append('collection_from', formData.country);
//         data.append('delivery_to', formData.collectionFrom);
//         data.append('shipment_ref', formData.customerReference);
//         data.append('user_type', formData.shipperOrConsignee);
//         data.append('collection_address', formData.collectionAddress);
//         for (let i = 0; i < formData.attachments.length; i++) {
//             data.append('document', formData.attachments[i]);
//         }

//         axios.post(`${process.env.REACT_APP_BASE_URL}freight-add`, data).then((response) => {
//             console.log(response.data)
//             toast.success(response.data.message)
//             if (response.data.success === true) {
//                 setTimeout(() => {
//                     navigate('/freight-details')
//                 }, [1500])
//             } else {
//                 toast.error("something went wrong")
//             }
//         }).catch((error) => {
//             console.log(error.response.data)
//         })
//     }

//     const handlekey12 = (e) => {
//         if (e.charCode < 46 || e.charCode > 57) {
//             e.preventDefault();
//         }
//     }

//     const handleclickprevious = () => {
//         navigate('/freight-details')
//     }

//     return (
//         <div className='frightFormSec pt50 pb50'>
//             <div className="container">
//                 <div className="row">
//                     <h1>Shipment Details</h1>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-8">
//                         <div className='col-lg-12 d-flex my-2'>
//                             <div className='col-lg-6'>
//                                 <h5>Freight Type</h5>
//                                 <select name="freightOption" id="freightOption" onChange={handleFreightOptionChange}>
//                                     <option value="">Select...</option>
//                                     <option value="Sea">Sea</option>
//                                     <option value="Air">Air</option>
//                                     <option value="Road">Road</option>
//                                     <option value="Rail">Rail</option>
//                                 </select>
//                                 <p className='text-danger'>{error.freightOption}</p>
//                             </div>
//                             {showSeaOptions && (
//                                 <div className='ms-2 col-lg-6'>
//                                     <h5>Sea Freight Options</h5>
//                                     <select name="seaOption" id="seaOption" onChange={handleInputChange}>
//                                         <option value="">Select...</option>
//                                         <option value="fullContainer">Full Container</option>
//                                         <option value="lessThanContainer">Less than Container Size</option>
//                                     </select>
//                                 </div>
//                             )}
//                             {showRoadOptions && (
//                                 <div className='ms-2 col-lg-6'>
//                                     <h5>Road Freight Options</h5>
//                                     <select name="roadOption" id="roadOption" onChange={handleInputChange}>
//                                         <option value="">Select...</option>
//                                         <option value="fullLoad">Full Load</option>
//                                         <option value="smallCargo">Small Cargo for Console</option>
//                                     </select>
//                                 </div>
//                             )}
//                         </div>
//                         <div className='mt-3 col-lg-6'>
//                             <h5>Freight Options</h5>
//                             <select name="expressOrNormal" onChange={handleInputChange}>
//                                 <option value="">Select...</option>
//                                 <option value="express">Express</option>
//                                 <option value="normal">Normal</option>
//                             </select>
//                         </div>
//                         <div className="borderShip">
//                             <h3 className='mb-4'>Shipment details</h3>
//                             <div className="row">
//                                 <div className="col-lg-6">
//                                     <h5>Origin</h5>
//                                     <div className="parentShipper">
//                                         <div className='childshipper'>
//                                             <input type="radio" onChange={handleInputChange} name='origin' value="Shipper will deliver at Asia Direct - Africa warehouse" />
//                                         </div>
//                                         <div className="childshipper ms-3">
//                                             <p>Shipper will deliver at Asia Direct - Africa warehouse</p>
//                                         </div>
//                                     </div>
//                                     <div className="parentShipper">
//                                         <div className='childshipper'>
//                                             <input type="radio" onChange={handleInputChange} name='origin' value="Asia Direct will collect from shipper address" />
//                                         </div>
//                                         <div className="childshipper ms-3">
//                                             <p>Asia Direct will collect from shipper address</p>
//                                         </div>
//                                     </div>
//                                     <p className='text-danger'>{error.origin}</p>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <h5>Destination</h5>
//                                     <div className="parentShipper">
//                                         <div className='childshipper'>
//                                             <input type="radio" onChange={handleInputChange} name='Destination' value="Consignee will collect from Asia Direct Africa warehouse" />
//                                         </div>
//                                         <div className="childshipper ms-3">
//                                             <p>Consignee will collect from Asia Direct Africa warehouse</p>
//                                         </div>
//                                     </div>
//                                     <div className="parentShipper">
//                                         <div className='childshipper'>
//                                             <input type="radio" onChange={handleInputChange} name='Destination' value="Asia Direct will deliver to Consignee address" />
//                                         </div>
//                                         <div className="childshipper ms-3">
//                                             <p>Asia Direct will deliver to Consignee address</p>
//                                         </div>
//                                     </div>
//                                     <p className='text-danger'>{error.Destination}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='d-flex'>
//                             <div className='me-2'>
//                                 <h5>Collection From</h5>
//                                 <select name="collectionFrom" onChange={handleInputChange}>
//                                     <option value="">Select...</option>
//                                     {country.map((item) => (
//                                         <option value={item.name} key={item.id}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <p className='text-danger'>{error.collectionFrom}</p>
//                             </div>
//                             <div className='ms-2'>
//                                 <h5>Country</h5>
//                                 <select name="country" onChange={handleInputChange}>
//                                     <option value="">Select...</option>
//                                     {country.map((item) => (
//                                         <option value={item.name} key={item.id}>{item.name}</option>
//                                     ))}
//                                 </select>
//                                 <p className='text-danger'>{error.country}</p>
//                             </div>
//                         </div>
//                         <div className="mt-2">
//                             <h5>Shipper / Consignee</h5>
//                             <input type="text" name='shipperOrConsignee' placeholder='Shipper/ Consignee' onChange={handleInputChange} />
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='col-lg-6'>
//                                 <h5>Port of Loading</h5>
//                                 <input type="text" name='portOfLoading' placeholder='Port of Loading' onChange={handleInputChange} />
//                             </div>
//                             <div className='col-lg-6'>
//                                 <h5>Collection Address</h5>
//                                 <input type="text" name='collectionAddress' placeholder='Collection Address' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='col-lg-6'>
//                                 <h5>Port of Discharge</h5>
//                                 <input type="text" name='portOfDischarge' placeholder='Port of Discharge' onChange={handleInputChange} />
//                             </div>
//                             <div className='col-lg-6'>
//                                 <h5>Delivery Address</h5>
//                                 <input type="text" name='deliveryAddress' placeholder='Delivery Address' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='me-2'>
//                                 <h5>Product Description</h5>
//                                 <input type="text" name='productDescription' placeholder='Product Description' onChange={handleInputChange} />
//                             </div>
//                             <div className='ms-2'>
//                                 <h5>Total Packages</h5>
//                                 <input type="number" onKeyPress={handlekey12} name='totalPackages' placeholder='Total Packages' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='me-2'>
//                                 <h5>Total Dimension (cbm)</h5>
//                                 <input type="number" name='totalDimension' placeholder='Total Dimension (cbm)' onChange={handleInputChange} />
//                             </div>
//                             <div className='ms-2'>
//                                 <h5>Nature of Goods</h5>
//                                 <input type="text" name='natureOfGoods' placeholder='Nature of Goods' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='me-2'>
//                                 <h5>Package Type</h5>
//                                 <input type="text" name='packageType' placeholder='Package Type' onChange={handleInputChange} />
//                             </div>
//                             <div className='ms-2'>
//                                 <h5>Total Weight (Kg)</h5>
//                                 <input type="number" name='totalWeight' placeholder='Total Weight (Kg)' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className='d-flex mt-2'>
//                             <div className='me-2'>
//                                 <h5>Auto Calculate</h5>
//                                 <input type="number" name='autoCalculate' placeholder='Auto Calculate' onChange={handleInputChange} />
//                             </div>
//                             <div className='ms-2'>
//                                 <h5>Attachment Type</h5>
//                                 <input type="text" name='attachmentType' placeholder='Attachment Type' onChange={handleInputChange} />
//                             </div>
//                         </div>
//                         <div className="mt-2">
//                             <h5>Comment</h5>
//                             <textarea name="comment" placeholder='Comment' onChange={handleInputChange} />
//                         </div>
//                         <div className="mt-2">
//                             <h5>Attachments</h5>
//                             <input type="file" name="attachments" multiple onChange={handleFileChange} />
//                         </div>
//                         <div className="mt-4">
//                             <button onClick={handleclicksubmit} className="btn btn-success me-3">Save & New</button>
//                             <button onClick={handleclickprevious} className="btn btn-secondary">Previous</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }
