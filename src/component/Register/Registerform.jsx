// export default RegisterForm;
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function RegisterForm() {
//     const [error, setError] = useState({});
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         client_name: '',
//         contact_person: '',
//         cellphone: '',
//         telephone: '',
//         email: '',
//         address_1: '',
//         address_2: '',
//         city: '',
//         province: '',
//         country: '',
//         code: '',
//         company_id: '',
//         importers_ref: '',
//         tax_ref: '',
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleKeyPress = (e) => {
//         if (e.charCode < 48 || e.charCode > 57) {
//             e.preventDefault();
//         }
//     };

//     const handlevalidate = (value) => {
//         let errors = {};
//         if (!value.client_name) errors.client_name = 'Client Name is required';
//         if (!value.contact_person) errors.contact_person = 'Contact Person is required';
//         if (!value.cellphone) errors.cellphone = 'Cellphone is required';
//         if (!value.email) errors.email = 'Email is required';
//         if (!value.city) errors.city = 'City is required';
//         if (!value.province) errors.province = 'Province is required';
//         if (!value.country) errors.country = 'Country is required';
//         if (!value.code) errors.code = 'Code is required';
//         if (!value.company_id) errors.company_id = 'Company id is required';
//         if (!value.password) errors.password = 'Password is required';
//         setError(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (handlevalidate(formData)) {
//             apihit();
//         }
//     };

//     const apihit = () => {
//         axios.post(`${process.env.REACT_APP_BASE_URL}customer-register`, formData)
//             .then((response) => {
//                 toast.success(response.data.message);
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 1000);
//             })
//             .catch((error) => {
//                 toast.error(error.response.data.message);
//             });
//     };

//     return (
//         <>
//             <section className='registrationForm'>
//                 <div className="container">
//                     <div className='row'>
//                         <h2>Register Form</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="row mt-3">
//                                 <div className="col-lg-6">
//                                     <label htmlFor="clientName">Client Name (Company / Individual)* :</label>
//                                     <input type="text" id="clientName" name="client_name" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.client_name}</p>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <label htmlFor="contactPerson">Contact Person*</label>
//                                     <input type="text" id="contactPerson" name="contact_person" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.contact_person}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="cellphone">Cellphone*</label>
//                                     <input type="tel" id="cellphone" max={12} maxLength={12} name="cellphone" onKeyPress={handleKeyPress} onChange={handleChange} required />
//                                     <p className='text-danger'>{error.cellphone}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="telephone">Telephone:</label>
//                                     <input type="tel" id="telephone"  max={12} maxLength={12} onKeyPress={handleKeyPress} name="telephone" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="email">Email*</label>
//                                     <input type="email" id="email" name="email" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.email}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="password">Password*</label>
//                                     <input type="password" id="password" name="password" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.password}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="address1">Address 1*:</label>
//                                     <input type="text" id="address1" name="address_1" onChange={handleChange} required />
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="city">City*</label>
//                                     <input type="text" id="city" name="city" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.city}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="province">Province*</label>
//                                     <input type="text" id="province" name="province" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.province}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="country">Country*</label>
//                                     <input type="text" id="country" name="country" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.country}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="code">Code*</label>
//                                     <input type="text" id="code" name="code" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.code}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="companyRegId">Company Reg / ID #*</label>
//                                     <input type="text" id="companyRegId" name="company_id" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.company_id}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="importersRef">Importers Ref:</label>
//                                     <input type="text" id="importersRef" name="importers_ref" onChange={handleChange} />
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="vatTaxRef">Vat / Tax Ref:</label>
//                                     <input type="text" id="vatTaxRef" name="tax_ref" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="address2">Address 2:</label>
//                                     <input type="text" id="address2" name="address_2" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className='text-center'>
//                                 <button type="submit">Register</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </section>
//         </>
//     );
// }

// export default RegisterForm;
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function RegisterForm() {
//     const [error, setError] = useState({});
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         client_name: '',
//         contact_person: '',
//         cellphone: '',
//         telephone: '',
//         email: '',
//         address_1: '',
//         address_2: '',
//         city: '',
//         province: '',
//         country: '',
//         code: '',
//         company_id: '',
//         importers_ref: '',
//         tax_ref: '',
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleKeyPress = (e) => {
//         if (e.charCode < 48 || e.charCode > 57) {
//             e.preventDefault();
//         }
//     };

//     const handlevalidate = (value) => {
//         let errors = {};
//         if (!value.client_name){ errors.client_name = 'Client Name is required';}
//         if (!value.contact_person) {errors.contact_person = 'Contact Person is required';}
//         if (!value.cellphone) {errors.cellphone = 'Cellphone is required';}
//         if (!value.email) {errors.email = 'Email is required';}
//         if (!value.city) {errors.city = 'City is required';}
//         if (!value.province) {errors.province = 'Province is required';}
//         if (!value.country) {errors.country = 'Country is required';}
//         if (!value.code) {errors.code = 'Code is required';}
//         if (!value.company_id) {errors.company_id = 'Company id is required';}
//         if (!value.password) {errors.password = 'Password is required';}
//         else{
//             apihit
//         }
//         setError(errors);
//         // return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = () => {
//     handlevalidate(formData)

//         }
//     };

//     const apihit = () => {
//         axios.post(`${process.env.REACT_APP_BASE_URL}customer-register`, formData)
//             .then((response) => {
//                 toast.success(response.data.message);
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 1000);
//             })
//             .catch((error) => {
//                 toast.error(error.response.data.message);
//             });
//     };

//     return (
//         <>
//             <section className='registrationForm'>
//                 <div className="container">
//                     <div className='row'>
//                         <h2>Register Form</h2>
//                             <div className="row mt-3">
//                                 <div className="col-lg-6">
//                                     <label htmlFor="clientName">Client Name (Company / Individual)* :</label>
//                                     <input type="text" id="clientName" name="client_name" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.client_name}</p>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <label htmlFor="contactPerson">Contact Person*</label>
//                                     <input type="text" id="contactPerson" name="contact_person" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.contact_person}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="cellphone">Cellphone*</label>
//                                     <input type="tel" id="cellphone" maxLength={12} name="cellphone" onKeyPress={handleKeyPress} onChange={handleChange} required />
//                                     <p className='text-danger'>{error.cellphone}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="telephone">Telephone:</label>
//                                     <input type="tel" id="telephone" maxLength={12} onKeyPress={handleKeyPress} name="telephone" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="email">Email*</label>
//                                     <input type="email" id="email" name="email" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.email}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="password">Password*</label>
//                                     <input type="password" id="password" name="password" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.password}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="address1">Address 1:</label>
//                                     <input type="text" id="address1" name="address_1" onChange={handleChange} />
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="city">City*</label>
//                                     <input type="text" id="city" name="city" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.city}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="province">Province*</label>
//                                     <input type="text" id="province" name="province" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.province}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="country">Country*</label>
//                                     <input type="text" id="country" name="country" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.country}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="code">Code*</label>
//                                     <input type="text" id="code" name="code" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.code}</p>
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="companyRegId">Company Reg / ID #*</label>
//                                     <input type="text" id="companyRegId" name="company_id" onChange={handleChange} required />
//                                     <p className='text-danger'>{error.company_id}</p>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="importersRef">Importers Ref:</label>
//                                     <input type="text" id="importersRef" name="importers_ref" onChange={handleChange} />
//                                 </div>
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="vatTaxRef">Vat / Tax Ref:</label>
//                                     <input type="text" id="vatTaxRef" name="tax_ref" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className='col-lg-6'>
//                                     <label htmlFor="address2">Address 2:</label>
//                                     <input type="text" id="address2" name="address_2" onChange={handleChange} />
//                                 </div>
//                             </div>
//                             <div className='text-center'>
//                                 <button type="submit" onSubmit={handleSubmit}>Register</button>
//                             </div>
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </section>
//         </>
//     );
// }

// export default RegisterForm;
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        client_name: '',
        contact_person: '',
        cellphone: '',
        telephone: '',
        email: '',
        address_1: '',
        address_2: '',
        city: '',
        province: '',
        country: '',
        code: '',
        company_id: '',
        importers_ref: '',
        tax_ref: '',
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleKeyPress = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    };

    const handleValidate = (value) => {
        let errors = {};
        if (!value.client_name) errors.client_name = 'Client Name is required';
        if (!value.contact_person) errors.contact_person = 'Contact Person is required';
        if (!value.cellphone) errors.cellphone = 'Cellphone is required';
        if (!value.email) errors.email = 'Email is required';
        if (!value.city) errors.city = 'City is required';
        if (!value.province) errors.province = 'Province is required';
        if (!value.country) errors.country = 'Country is required';
        if (!value.code) errors.code = 'Code is required';
        if (!value.company_id) errors.company_id = 'Company ID is required';
        if (!value.password) errors.password = 'Password is required';

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidate(formData)) {
            apihit();
        }
    };

    const apihit = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}customer-register`, formData)
            .then((response) => {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <>
            <section className='registrationForm'>
                <div className="container">
                    <div className='row'>
                        <h2>Register Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-lg-6">
                                    <label htmlFor="clientName">Client Name (Company / Individual)* :</label>
                                    <input type="text" id="clientName" name="client_name" onChange={handleChange} required />
                                    <p className='text-danger'>{error.client_name}</p>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="contactPerson">Contact Person* :</label>
                                    <input type="text" id="contactPerson" name="contact_person" onChange={handleChange} required />
                                    <p className='text-danger'>{error.contact_person}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="cellphone">Cellphone* :</label>
                                    <input type="tel" id="cellphone" maxLength={12} name="cellphone" onKeyPress={handleKeyPress} onChange={handleChange} required />
                                    <p className='text-danger'>{error.cellphone}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="telephone">Telephone:</label>
                                    <input type="tel" id="telephone" maxLength={12} onKeyPress={handleKeyPress} name="telephone" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="email">Email* :</label>
                                    <input type="email" id="email" name="email" onChange={handleChange} required />
                                    <p className='text-danger'>{error.email}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="password">Password* :</label>
                                    <input type="password" id="password" name="password" onChange={handleChange} required />
                                    <p className='text-danger'>{error.password}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="address1">Address 1:</label>
                                    <input type="text" id="address1" name="address_1" onChange={handleChange} />
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="city">City* :</label>
                                    <input type="text" id="city" name="city" onChange={handleChange} required />
                                    <p className='text-danger'>{error.city}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="province">Province* :</label>
                                    <input type="text" id="province" name="province" onChange={handleChange} required />
                                    <p className='text-danger'>{error.province}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="country">Country* :</label>
                                    <input type="text" id="country" name="country" onChange={handleChange} required />
                                    <p className='text-danger'>{error.country}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="code">Code* :</label>
                                    <input type="text" id="code" name="code" onChange={handleChange} required />
                                    <p className='text-danger'>{error.code}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="companyRegId">Company Reg / ID #* :</label>
                                    <input type="text" id="companyRegId" name="company_id" onChange={handleChange} required />
                                    <p className='text-danger'>{error.company_id}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="importersRef">Importers Ref:</label>
                                    <input type="text" id="importersRef" name="importers_ref" onChange={handleChange} />
                                </div>
                                <div className='col-lg-6'>
                                    <label htmlFor="vatTaxRef">Vat / Tax Ref:</label>
                                    <input type="text" id="vatTaxRef" name="tax_ref" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-6'>
                                    <label htmlFor="address2">Address 2:</label>
                                    <input type="text" id="address2" name="address_2" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type="button" onClick={handleSubmit}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default RegisterForm;
