import React from 'react'
import Topbar from '../Topbar'
import Navbar from '../homepage/Navbar'
import Footer from '../homepage/Footer'

export default function ClearenceOrder() {
    return (
        <div>
            <Topbar />
            <Navbar />
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
                    {/* { */}
                    {/* // currentdata && currentdata.length > 0 && currentdata.map((item, index) => { */}
                    {/* //   console.log(item)/</tbody> */}
                    {/* //   const datenw = new Dat/</tbody>e(item.date); */}
                    {/* //   const options = { */}
                    {/* //     year: 'numeric', */}
                    {/* //     month: '2-digit', */}
                    {/* //     day: '2-digit' */}
                    {/* //   }; */}
                    {/* //   const formattedDate = datenw.toLocaleDateString("en-GB", options); */}
                    {/* //   console.log(formattedDate); */}
                    {/* //   return ( */}
                    {/* // <> */}
                    <tr >
                        <td className='col-1'  ></td>
                        <td className='col-2'  ></td>
                        <td className='col-2'  ></td>
                        {/* <td className='col-1'  >{item.freight}</td>
                                        <td className='col-1'  >{item.dimension}</td>
                                        <td className='col-1'  >{item.weight}</td> */}
                        <td className='col-1'  ></td>
                        <td className='col-1'  ></td>
                        {/* <td>
                                          <i className="fa fa-eye" />
                                        </td> */}
                        <td>
                            <i className="fi fi-br-track" style={{ cursor: 'pointer' }} />
                        </td>
                    </tr>
                    {/* // </> */}
                    {/* //   ) */}
                    {/* // }) */}
                    {/* //   } */}
                </tbody>
            </table>
            <Footer />
        </div>
    )
}
