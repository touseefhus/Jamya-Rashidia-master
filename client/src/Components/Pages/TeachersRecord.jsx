import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useReactToPrint } from 'react-to-print';

const TeachersRecord = () => {
  const { user } = useAuthContext();
  const componentPDF = useRef();
  const [teachersData, setTeachersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [idCardSearchTerm, setIdCardSearchTerm] = useState('');
  const [idCitySearchTerm, setIdCitySearchTerm] = useState('');
  const [idProvinceSearchTerm, setIdProvinceSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/viewTeachers', {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
    .then(response => {
      setTeachersData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [user]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
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

  const removeTeacher = (index) => {
    // Create a copy of the teachersData array
    const updatedTeachersData = [...teachersData];
    // Remove the teacher at the specified index
    updatedTeachersData.splice(index, 1);
    // Update the state with the modified array
    setTeachersData(updatedTeachersData);
  };

  const calculateDaysDifference = (appointmentDate) => {
    const today = new Date();
    const diffTime = Math.abs(today - new Date(appointmentDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredTeachers = teachersData.filter(teacher =>
    (teacher.teacherName && teacher.teacherName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (teacher.teacherIdCard && teacher.teacherIdCard.toString().toLowerCase().includes(idCardSearchTerm.toLowerCase())) &&
    (teacher.city && teacher.city.toString().toLowerCase().includes(idCitySearchTerm.toLowerCase())) &&
    (teacher.province && teacher.province.toString().toLowerCase().includes(idProvinceSearchTerm.toLowerCase()))
  );

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <>
      {/* Search inputs */}
      <div className='d-flex gap-5'>
        <input
          type="text"
          placeholder=" نام سے تلاش کریں"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="searchBar"
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
        <table className='table table-bordered mt-3'>
          <thead>
            <tr>
              <th>استاد کا نام</th>
              <th>والد کا نام</th>
              <th>عہدہ</th>
              <th>شناختی کارڈ نمبر</th>
              <th>تاریخ پیدائش</th>
              <th>تاریخ تقرری</th>
              <th>موجودہ پتہ</th>
              <th>موبائل نمبر</th>
              <th>مشاہرہ</th>
              <th>ای میل آئی ڈی</th>
              <th>رہائش</th>
              <th>تقریبی دن</th>
              <th>عملیات</th> {/* Add a column for operations */}
            </tr>
          </thead>
          {/* Table body with filtered data */}
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.teacherName}</td>
                <td>{teacher.teacherFatherName}</td>
                <td>{teacher.teacherPosition}</td>
                <td>{teacher.teacherIdCard}</td>
                <td>{new Date(teacher.teacherDOB).toLocaleDateString()}</td>
                <td>{new Date(teacher.appointmentDate).toLocaleDateString()}</td>
                <td>{teacher.currentAddress}<br/>{teacher.province}<br/>{teacher.city}</td>
                <td>{teacher.contact}</td>
                <td>{teacher.advertising}</td>
                <td>{teacher.email}</td>
                <td>{teacher.residential ? 'مقیم' : 'غیر مقیم'}</td>
                <td>{calculateDaysDifference(teacher.appointmentDate)}</td>
                <td>
                  {/* Button to remove the teacher */}
                  <button onClick={() => removeTeacher(index)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeachersRecord;
