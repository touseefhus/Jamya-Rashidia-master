import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Pages.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useReactToPrint } from 'react-to-print';

const StudentsRecord = () => {
  const componentPDF = useRef();
  const { user } = useAuthContext();
  const [studentsData, setStudentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Number of students to display per page

  useEffect(() => {
    axios.get('http://localhost:5000/api/viewStudents', {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
    .then(response => {
      setStudentsData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [user]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredStudents = studentsData.filter(student =>
    student.studentName && student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate indexes for slicing the students array
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <>
      <input
        type="text"
        placeholder=" نام سے تلاش کریں"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className='searchBar'
      />

      <div className="student-table">
        <div ref={componentPDF}>
          <button className='printBtn' onClick={generatePDF}>Print</button>
          <table className='table table-bordered mt-3'>
            <thead>
              <tr>
                <th>نام</th>
                <th>والد کا نام</th>
                <th>رقم الجامعہ</th>
                <th>طالب کا شناختی کارڈ</th>
                <th>تصویر</th>
                <th>تاریخ پیدائش</th>
                <th>سرپرست کا نام</th>
                <th>سرپرست کا شناختی کارڈ</th>
                <th>والدکاپیشہ</th>
                <th>موجودہ پتہ</th>
                <th>رابطہ طالب علم</th>
                <th>رابطہ سرپرست</th>
                <th>عصری تعلم</th>
                <th>تاریخ داخلہ قمری</th>
                <th>تاریخ داخلہ شمسی</th>
                <th>تجدید داخلہ</th>
                <th>رہائش</th>
                <th>سابقہ مدرسے کا نام</th>
                <th>درجہ</th>
                <th>تعلیمی و اخلاقی کیفیت</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.studentFatherName}</td>
                  <td>{student.jamiaMoney}</td>
                  <td>{student.studentIdCard}</td>
                  <td>
  {student.studentPic && (
    <img
      src={`data:image/jpeg;base64,${Buffer.from(student.studentPic.data).toString('base64')}`}
      alt=""
      style={{ maxWidth: '100px' }} // Adjust the max-width as needed
    />
  )}
</td>
                  <td>{new Date(student.studentDOB).toLocaleDateString()}</td>
                  <td>{student.guardianName}</td>
                  <td>{student.guardianIdCard}</td>
                  <td>{student.fatherOccupasion}</td>
                  <td>{student.currentAddress}<br/>{student.province}<br/>{student.city}</td>
                  <td>{student.studentContact}</td>
                  <td>{student.guardianContact}</td>
                  <td>{student.contemporaryEducation}</td>
                  <td>{new Date(student.dateEntryLunar).toLocaleDateString()}</td>
                  <td>{new Date(student.solarEntryDate).toLocaleDateString()}</td>
                  <td>{student.renewalAdmission}</td>
                  <td>{student.residential ? 'مقیم' : 'غیر مقیم'}</td>
                  <td>{student.oldSchool}</td>
                  <td>{student.studentPosition}</td>
                  <td>{student.molarity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentStudents.length < studentsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StudentsRecord;
