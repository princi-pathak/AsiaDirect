import React from 'react'
import Navbar from '../homepage/Navbar'
import Topbar from '../Topbar'
import Footer from '../homepage/Footer'
import Trackingform from './Trackingform'

export default function Tracking() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <Trackingform />
            <Footer />
        </div>
    )
}
