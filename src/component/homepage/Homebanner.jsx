import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Homebanner() {

    useEffect(() => {
        AOS.init({
          disable: "phone",
          duration: 700,
          easing: "ease-out-cubic",
        });
      }, []);

const userid = JSON.parse(localStorage.getItem("data"))
    const navigate=useNavigate()
const hanldeclicknavi=()=>{
    if(userid===null||undefined){
        navigate('/login')
    }else{
        navigate('/addfreight')
    }
}
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows:true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='bannerHome item '>
            <Slider {...settings}>
                <div className='image111' >
                <div data-aos="fade-down-right">
                    <div className="" style={{ margin: "80px 80px", width: "600px" }}>
                        <p className='text-white fw-bolder' style={{fontSize:"3rem"}}>See how truly integrated
                            logistics delivers</p>
                        <p className='text-white fs-5'>With truly integrated logistics there’s always a new way to keep your goods moving and
                            your business growing.</p>
                        <button className='btn text-white py-3 px-4 fw-bolder' onClick={hanldeclicknavi} style={{ backgroundColor: "#ce1d22", }}>Add Freight <i className="fi fi-rr-arrow-right"></i></button>
                    </div>
                    </div>
                </div>
                <div className='image113'>
                <div className="" style={{ margin: "80px 80px", width: "600px" }}>
                        <p className='text-white fw-bolder' style={{fontSize:"3rem"}}>See how truly integrated
                            logistics delivers</p>
                        <p className='text-white fs-5'>With truly integrated logistics there’s always a new way to keep your goods moving and
                            your business growing.</p>
                        <button className='btn text-white py-3 px-4 fw-bolder' onClick={hanldeclicknavi} style={{ backgroundColor: "#ce1d22", }}>Add Freight <i className="fi fi-rr-arrow-right"></i></button>
                    </div>
                </div>
                <div className='image114'>
                <div className="" style={{ margin: "80px 80px", width: "600px" }}>
                        <p className='text-white fw-bolder' style={{fontSize:"3rem"}}>See how truly integrated
                            logistics delivers</p>
                        <p className='text-white fs-5'>With truly integrated logistics there’s always a new way to keep your goods moving and
                            your business growing.</p>
                        <button className='btn text-white py-3 px-4 fw-bolder' onClick={hanldeclicknavi} style={{ backgroundColor: "#ce1d22", }}>Add Freight <i className="fi fi-rr-arrow-right"></i></button>
                    </div>
                </div>
                <div className='image115 '>
                <div className="" style={{ margin: "80px 80px", width: "600px" }}>
                        <p className='text-white fw-bolder' style={{fontSize:"3rem"}}>See how truly integrated
                            logistics delivers</p>
                        <p className='text-white fs-5'>With truly integrated logistics there’s always a new way to keep your goods moving and
                            your business growing.</p>
                        <button className='btn text-white py-3 px-4 fw-bolder' onClick={hanldeclicknavi} style={{ backgroundColor: "#ce1d22", }}>Add Freight <i className="fi fi-rr-arrow-right"></i></button>
                    </div>
                </div>


            </Slider>
        </div>
    )
}


