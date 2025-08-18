import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function CustomCalculate() {
  const navigate = useNavigate();
  const [hfCode, setHfCode] = useState('');
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [error, setError] = useState({});
  const [finalAmount, setFinalAmount] = useState(0);

  const handleInputChange = (e) => {
    setHfCode(e.target.value);
  };

  const handleValidate = (e) => {
    if (e.charCode < 46 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  const handleClickHf = () => {
    if (rows.length >= 3) {
      toast.error('You can only add up to 3 rows.');
      return;
    }
    const hfcoede = { hs_code: hfCode };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}find-hs-code`, hfcoede)
      .then((response) => {
        console.log(response.data.data)
        setData(response.data.data);
        setRows([...rows, {
          hs_code: hfCode,
          hs_cod_desc: response.data.data.hs_cod_desc,
          valueofgoods: '',
          quotedRate: '',
          csercount: 0,
          datavalttac: 0,
          datavat: 0,
          estimate: 0
        }]);
        setHfCode('');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleChangeValueOfGood = (e, index) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleClickValue = (index) => {
    const finalVal = rows[index].valueofgoods;
    const calculate10 = finalVal * 0.1;
    const overall = parseFloat(finalVal) + calculate10;
    const finalRes = overall * parseFloat(rows[index].quotedRate);

    const newRows = [...rows];
    newRows[index].csercount = finalRes;
    newRows[index].datavalttac = (finalRes * 0.1).toFixed(2);
    newRows[index].datavat = ((parseFloat(newRows[index].datavalttac) + finalRes) * 0.15).toFixed(2);
    newRows[index].estimate = (parseFloat(newRows[index].datavat) + parseFloat(newRows[index].datavalttac)).toFixed(2);
    setRows(newRows);

    const totalEstimate = newRows.reduce((acc, row) => acc + parseFloat(row.estimate), 0);
    setFinalAmount(totalEstimate);
  };

  const handleSaveValue = () => {
    handleValidate12();
  };

  const handleValidate12 = () => {
    let error = {};
    rows.forEach((row, index) => {
      if (!row.valueofgoods) {
        toast.error('Value of goods is required');
        error[`valueofgoods${index}`] = 'Value of goods is required';
      }
      if (!row.quotedRate) {
        toast.error('Quoted Rate is required');
        error[`quotedRate${index}`] = 'Quoted Rate is required';
      }
    });
    setError(error);
    if (Object.keys(error).length === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      }).then((result) => {
        if (result.isConfirmed) {
          handleApi();
        }
      });
    }
  };

  const handleApi = () => {
    const reqdata = rows.map(row => ({
      clearance_id: clearenceid ? clearenceid : clearenceid1,
      client_id: userid?.id,
      quoted_rate: row.quotedRate,
      HS_tariff_code: row.hs_code,
      HS_description: row.hs_cod_desc,
      goods_value: row.valueofgoods,
      values_of_good: row.csercount,
      vat: row.datavalttac,
      import_duty_per: row.datavalttac,
      vat_per: "15",
      import_duty: row.datavat,
      customs_amount_due: row.estimate,
      total_amount: finalAmount,
    }));

    axios.post(`${process.env.REACT_APP_BASE_URL}calculate-clearance`, { data: reqdata })
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/Admin/custom-clearance-order')
        }, 1500)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location1 = useLocation();
  const clearenceid1 = location1?.state?.data;
  const location = useLocation();
  const clearenceid = location?.state?.dataIID;
  const userid = JSON.parse(localStorage.getItem('data'));

  const handleclicknav =() =>{
    navigate('/Admin/custom-clearance-order')
  }
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row  manageFreight">
          <div className="col-12">
            <div className="d-flex ">
            <div className="d-flex">
                  <div>
                    <ArrowBackIcon
                      onClick={handleclicknav}
                      className="text-dark"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <h4 className="freight_hd ms-3">Estimate</h4>

                  </div>
                  </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <div className='d-flex align-items-center'>
              <div className='updateLoading'>
                <label>Enter your HS code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="HS Code"
                  value={hfCode}
                  onChange={handleInputChange}
                  onKeyPress={handleValidate}
                />
              </div>
              <div className="" style={{ marginLeft: "20px" }}>
                {hfCode && (
                  <button className="add_hscode" onClick={handleClickHf}>
                    +
                  </button>
                )}
              </div>
            </div>
            <div className="table-responsive">
              <table className="table border">
                <thead className="esti_thead">
                  <tr>
                    <th>HS Code</th>
                    <th>Description</th>
                    <th>VAT%</th>
                    <th>Value of Goods</th>
                    <th>Quoted Rate</th>
                    <th></th>
                    <th>Value Of Goods</th>
                    <th>VAT</th>
                    <th>Import Duty</th>
                    <th>Calculate</th>
                  </tr>
                </thead>
                <tbody className='esti_tbody'>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <th>{row.hs_code}</th>
                      <td>{row.hs_cod_desc}</td>
                      <td>15%</td>
                      <td>
                        <input
                          onKeyPress={handleValidate}
                          name="valueofgoods"
                          className='form-control'
                          value={row.valueofgoods}
                          onChange={(e) => handleChangeValueOfGood(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          onKeyPress={handleValidate}
                          name="quotedRate"
                          className='form-control'
                          value={row.quotedRate}
                          onChange={(e) => handleChangeValueOfGood(e, index)} />
                      </td>
                      <td><button
                        className="ms-2 py-1 btn rounded"
                        onClick={() => handleClickValue(index)}
                        style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        Add
                      </button></td>
                      <td>{row.csercount}</td>
                      <td>{row.datavalttac}</td>
                      <td>{row.datavat}</td>
                      <td>{row.estimate}</td>
                    </tr>
                  ))}
                  {rows.length > 0 && (
                    <>
                      <tr>
                        <td colSpan="10" className="text-end">
                          <strong>Final Amount: </strong> {finalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className='text-center'>
              <button
                className="add_clear_btn"
                onClick={handleSaveValue}
              >
                Add Clearance
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
