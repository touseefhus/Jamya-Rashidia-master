import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useReactToPrint } from 'react-to-print';

const EmployersRecord = () => {
  const componentPDF = useRef();
  const { user } = useAuthContext();
  const [employersData, setEmployersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [idCardSearchTerm, setIdCardSearchTerm] = useState('');
  const [idCitySearchTerm, setIdCitySearchTerm] = useState('');
  const [idProvinceSearchTerm, setIdProvinceSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/viewEmployers', {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
    .then(response => {
      setEmployersData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [user]);

  const handleSearchTermChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIdCardSearchTermChange = (event) => {
    setIdCardSearchTerm(event.target.value);
  };

  const handleCitySearchTerm = (event) => {
    setIdCitySearchTerm(event.target.value);
  };

  const handleProvinceSearchTerm = (event) => {
    setIdProvinceSearchTerm(event.target.value);
  };

  const removeEmployer = (index) => {
    // Create a copy of the employersData array
    const updatedEmployersData = [...employersData];
    // Remove the employer at the specified index
    updatedEmployersData.splice(index, 1);
    // Update the state with the modified array
    setEmployersData(updatedEmployersData);
  };

  const calculateDaysDifference = (appointmentDate) => {
    const today = new Date();
    const diffTime = Math.abs(today - new Date(appointmentDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredEmployers = employersData.filter(employer =>
    (employer.employersName && employer.employersName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (employer.employersIdCard && employer.employersIdCard.toString().toLowerCase().includes(idCardSearchTerm.toLowerCase())) &&
    (employer.city && employer.city.toString().toLowerCase().includes(idCitySearchTerm.toLowerCase())) &&
    (employer.province && employer.province.toString().toLowerCase().includes(idProvinceSearchTerm.toLowerCase()))
  );

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <>
      <div className='d-flex gap-5'>
        <input
          type="text"
          placeholder="نام سے تلاش کریں"
          value={searchQuery}
          onChange={handleSearchTermChange}
          className='searchBar'
        />
        <input
          type="text"
          placeholder="شناختی کارڈ نمبر سے تلاش کریں"
          value={idCardSearchTerm}
          onChange={handleIdCardSearchTermChange}
          className="searchBar"
        />
        <input
          type="text"
          placeholder="شہر"
          value={idCitySearchTerm}
          onChange={handleCitySearchTerm}
          className="searchBar"
        />
        <input
          type="text"
          placeholder="صوبہ"
          value={idProvinceSearchTerm}
          onChange={handleProvinceSearchTerm}
          className="searchBar"
        />
      </div>
      
      <div ref={componentPDF}>
        <button className='printBtn' onClick={generatePDF}>Print</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ملازم کا نام</th>
              <th>والد کا نام</th>
              <th>درجہ</th>
              <th>تاریخ پیدائش</th>
              <th>شناختی کارڈ</th>
              <th>موجودہ پتہ</th>
              <th>موبائل نمبر</th>
              <th>تاریخ تقرری</th>
              <th>مشاہرہ</th>
              <th>ای میل آئی ڈی</th>
              <th>رہائش</th>
              <th>تقریبی دن</th>
              <th>عملیات</th> {/* Add a column for operations */}
            </tr>
          </thead>
          <tbody>
            {filteredEmployers.map((employer, index) => (
              <tr key={index}>
                <td>{employer.employersName}</td>
                <td>{employer.employersFatherName}</td>
                <td>{employer.employersPosition}</td>
                <td>{new Date(employer.employersDOB).toLocaleDateString()}</td>
                <td>{employer.employersIdCard}</td>
                <td>{employer.currentAddress}<br/>{employer.province}<br/>{employer.city}</td>
                <td>{employer.contact}</td>
                <td>{new Date(employer.appointmentDate).toLocaleDateString()}</td>
                <td>{employer.advertising}</td>
                <td>{employer.Email}</td>
                <td>{employer.residential ? 'مقیم' : 'غیر مقیم'}</td>
                <td>{calculateDaysDifference(employer.appointmentDate)}</td>
                <td>
                  {/* Button to remove the employer */}
                  <button onClick={() => removeEmployer(index)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployersRecord;
