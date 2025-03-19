import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../homepage/Footer'
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';

export default function OrderDetailsconform() {

    const location = useLocation();
    const data = (location?.state?.data)
    console.log(data.assign_id)
  return (
<>
<Topbar />
<Navbar />
<div>
       <section className="formDetails">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <h4 className="empyDetailHead">Full Order Details</h4>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label htmlFor="">cargo des country</label>
        <input className="form-control" disabled value={data.cargo_des_country}  readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">cargo_des_town</label>
        <input className="form-control" disabled value={data.cargo_des_town} placeholder="" readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">Commodiity</label>
        <input
          type="text"
          value={data.commodity}
          className="form-control"
          placeholder="xyz"
          readOnly=""
          disabled
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>Custome Clearing</label>
        <input disabled placeholder="12/3/12" value={data.customs_clearing} className="form-control" readOnly="" />
      </div>
      <div className="col">
        <label>Dimension</label>
        <input disabled placeholder="LCL" className="form-control" value={data.dimension} readOnly="" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>Freight</label>
        <input placeholder="sea" className="form-control" value={data.freight} readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">Full Name</label>
        <input placeholder="DDP" className="form-control" value={data.full_name} readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">Hazardous</label>
        <input placeholder={5} className="form-control" readOnly="" value={data.hazardous} />
      </div>
    </div>
    <div className="horizontalLine"></div>
    <div className="row">
      <div className="col">
        <label>incoterm</label>
        <input placeholder={5} className="form-control" readOnly="" value={data.incoterm} />
      </div>
      <div className="col">
        <label>industry </label>
        <input placeholder="yes" className="form-control" readOnly="" value={data.industry} />
      </div>
      <div className="col">
        <label htmlFor="">loading_frequency</label>
        <input placeholder="Pending" className="form-control" readOnly=""  value={data.loading_frequency}/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>mode_of_transport</label>
        <input
          placeholder="1705310072449-profilemenu.png"
          className="form-control"
          readOnly=""
          value={data.mode_of_transport}
        />
      </div>
      <div className="col">
        <label>no_of_packages</label>
        <input placeholder={0}  value={data.no_of_packages}className="form-control" readOnly="" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label htmlFor="">package_type</label>
        <input placeholder="" className="form-control" value={data.package_type} readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">place_of_delivery</label>
        <input placeholder={12} className="form-control" value={data.place_of_delivery} readOnly="" />
      </div>
      <div className="col">
        <label htmlFor=""> port_of_loading</label>
        <input
          placeholder="package type"
          className="form-control"
          readOnly=""
          value={data.port_of_loading}
        />
      </div>
    </div>
    <div className="horizontalLine"></div>
    <div className="row">
      <div className="col">
        <label htmlFor="">post_of_discharge</label>
        <input placeholder="commodity" value={data.post_of_discharge} className="form-control" readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">product_desc</label>
        <input placeholder="hazardous" value={data.product_desc} className="form-control" readOnly="" />
      </div>
      <div className="col">
        <label>quote_received</label>
        <input placeholder="healthCare" value={data.quote_received} className="form-control" readOnly="" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>ready_for_collection</label>
        <input placeholder={5} className="form-control" value={data.ready_for_collection} readOnly="" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>Supplier Address</label>
        <input
          placeholder="supplier address"
          className="form-control"
          readOnly=""
          value={data.shipper_address}
        />
      </div>
      <div className="col">
        <label htmlFor="">shipper_email</label>
        <input
          placeholder="port of loading"
          className="form-control"
          readOnly=""
          value={data.shipper_email}
        />
      </div>
      <div className="col">
        <label>supplier_address</label>
        <input
          placeholder="post of discharge"
          className="form-control"
          readOnly=""
          value={data.supplier_address}
        />
      </div>
    </div>
    <div className="horizontalLine" />
    <div className="row">
      <div className="col">
        <label htmlFor="">type</label>
        <input
          placeholder="place of delivery"
          className="form-control"
          readOnly=""
          value={data.type}
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>supplier_address</label>
        <input
          placeholder="ready for collection"
          className="form-control"
          readOnly=""
          value={data.supplier_address}
        />
      </div>
      <div className="col">
        <label>quote_document</label>
        <input placeholder={123} value={data.quote_document} className="form-control"  readOnly="" />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label>shipper_tel</label>
        <input placeholder={12} value={data.shipper_tel} className="form-control" readOnly="" />
      </div>
      <div className="col">
        <label htmlFor="">Transit Time</label>
        <input placeholder="12ns" value={data.transit_time} className="form-control" readOnly="" />
      </div>
    </div>
    <div className="horizontalLine" />
  </div>
</section>
    </div>
  <Footer />
  </>
  )
}
