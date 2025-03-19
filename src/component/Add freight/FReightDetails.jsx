import React, { useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Topbar from '../Topbar';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import { useLocation } from 'react-router-dom';

export default function FreightDetails() {
    const location = useLocation()
    const data1 = (location?.state?.printdata[0])
    const data = {
        Client_ref: data1?.client_ref,
        Product_desc: data1?.product_desc,
        Freight: data1?.freight,
        Dimension: data1?.dimension,
        Weight: data1?.weight,
        Comment: data1?.comment,
        No_of_Packages: data1?.no_of_packages,
        collection_from_country: data1?.collection_from_country,
        delivery_to_country: data1?.delivery_to_country,
        client_name: data1?.client_name,
        road_freight_option: data1?.road_freight_option,
        sea_freight_option: data1?.sea_freight_option,
        add_attachments: data1?.add_attachments,
        auto_calculate: data1?.auto_calculate,
        delivery_address: data1?.delivery_address,
        collection_address: data1?.collection_address,
        user_type: data1?.user_type,
        shipment_ref: data1?.shipment_ref,
        shipment_origin: data1?.shipment_origin,
        freight_type: data1?.freight_type,
        post_of_discharge: data1?.post_of_discharge,
        port_of_loading: data1?.port_of_loading,
        package_type: data1?.package_type,
    };
useEffect(()=>{
window.scrollTo(0,0)
},[])
    return (
        <div>
            <Topbar />
            <Navbar />
            <section className="formDetails">
                <Container className="mt-5">
                    <h4 className="empyDetailHead">Freight Details</h4>
                    <Row>
                        {Object.entries(data).map(([key, value]) => (
                            <Col key={key} lg={4} className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>{key.replace(/_/g, ' ')}</Form.Label>
                                    <Form.Control type="text" placeholder={value} readOnly />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />
        </div>
    );
}

