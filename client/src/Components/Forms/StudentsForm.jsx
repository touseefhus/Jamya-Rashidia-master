import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import StudentFormValidation from '../Forms_validation/StudentsFormValidation'; // Import the validation function
import ProvincesAndCities from './ProvinceCity';
import Select from 'react-select';

const StudentsForm = () => {
  const { user } = useAuthContext();
  const { provinces, cities } = ProvincesAndCities(); // Access provinces and cities arrays
  const [studentsForm, setStudentsForm] = useState({
    studentName: '',
    studentFatherName: '',
    jamiaMoney: '',
    studentIdCard: '',
    studentPic: null,
    studentDOB: '',
    guardianName: '',
    guardianIdCard: '',
    fatherOccupation: '',
    currentAddress: '',
    province: '', // Newly added province field
    city: '', // Newly added city field
    studentContact: '',
    guardianContact: '',
    contemporaryEducation: '',
    dateEntryLunar: '',
    solarEntryDate: '',
    renewalAdmission: '',
    residential: {
      resident: true,
      nonResident: false,
       },
    oldSchool: '',
    molarity: '',
    studentPosition: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({}); // State to store form validation errors
  
  const onChangeHandler = (event) => {
    const { name, value, type } = event.target;
    let newValue = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    // ///// //for numeric validations
    if (
      name === 'studentIdCard' ||
      name === 'studentContact' ||
      name === 'guardianContact' ||
      name === 'jamiaMoney' ||
      name === 'guardianIdCard'
    ) {
      // Remove any non-numeric characters and format as per pattern
      newValue = newValue.replace(/\D/g, '').replace( "$1-$2-$3");
    }

    if (type === 'file') {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          if (img.width === img.height) {
            setStudentsForm((prevForm) => ({
              ...prevForm,
              [name]: file,
            }));
          } else {
            alert('Please upload a square image.');
          }
        };
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else  if (type === 'radio') {
      setStudentsForm((prevForm) => ({
        ...prevForm,
        residential: value === 'true', // Convert string value to boolean
      }));
    } else {
      setStudentsForm((prevForm) => ({
        ...prevForm,
        [name]: newValue,
      }));
    }
  };

   const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation
    const validationErrors = StudentFormValidation(studentsForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Do not proceed with form submission if there are validation errors
    }

    try {
      console.log('Form Data:', studentsForm);

      const response = await axios.post('http://localhost:5000/api/addStudents', studentsForm, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      console.log('Response Data:', response.data);
      setSubmitSuccess(true); // Set submitSuccess to true after successful submission

      // Reset the form fields and state after successful submission
      setStudentsForm({
        studentName: '',
        studentFatherName: '',
        jamiaMoney: '',
        studentIdCard: '',
        studentPic: null,
        studentDOB: '',
        guardianName: '',
        guardianIdCard: '',
        fatherOccupation: '',
        currentAddress: '',
        province: '', // Reset the province field
        city: '', // Reset the city field
        studentContact: '',
        guardianContact: '',
        contemporaryEducation: '',
        dateEntryLunar: '',
        solarEntryDate: '',
        renewalAdmission: '',
        residential: {
          resident: true,
          nonResident: false,
           },
        oldSchool: '',
        molarity: '',
        studentPosition: '',
      });

      // alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setStudentsForm((prevForm) => ({
      ...prevForm,
      province: selectedProvince,
      city: '', // Reset the city when province changes
    }));
  };
  
  return (
    <>
       {submitSuccess && (
        <div className="alert alert-success" role="alert">
         فارم کا اندراج کامیابی سے ہوا
        </div>
      )}
      <form onSubmit={handleSubmit}>
      <h1 className='text-center mt-2'>طلبہ کا  فارم</h1>
        <div className='row'>
          <div className='col-6'>
            <label className='form-label mt-3' htmlFor="studentName">نام</label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="studentName"
              id="studentName"
              value={studentsForm.studentName}
            />
            {errors.studentName &&(
              <div className='text-danger'>{errors.studentName}</div>
            )}
            
          <label className='form-label mt-2' htmlFor="jamiaMoney">رقم الجامعہ</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="numeric"
              onChange={onChangeHandler}
              name="jamiaMoney"
              id="jamiaMoney"
              value={studentsForm.jamiaMoney}/>
              
          {errors.jamiaMoney&&(
            <div className='text-danger'>{errors.jamiaMoney}</div>
          )}

              <label className='form-label mt-1' htmlFor="studentPic">تصویر</label>
              <div className="passport-size-box">
              <input
              className='form-control file-input'
              // required
              autoComplete='off'
              type="file"
              onChange={onChangeHandler}
              name="studentPic"
              id="studentPic"
            
              />
          {/* Display the selected image in the box */}
          {studentsForm.studentPic && (
            <img
              className="preview-image"
              src={URL.createObjectURL(studentsForm.studentPic)}
              alt="Student Preview"
            />
          )}
        </div>
        {/* {errors.studentPic&&(
          <div className='text-danger'>{errors.studentPic}</div>
        )} */}

            <label className='form-label mt-2' htmlFor="guardianIdCard">سرپرست کا شناختی کارڈ</label>
            <input
            className='form-control'
            autoComplete='off'
            type="text"
            maxLength="13"
            pattern="[0-9]*"
            onChange={onChangeHandler}
            name="guardianIdCard"
            id="guardianIdCard"
            value={studentsForm.guardianIdCard}
            placeholder="XXXXX-XXXXXXX-X"
            />
             {errors.guardianIdCard&&(
          <div className='text-danger'>{errors.guardianIdCard}</div>
           )}


<label className='form-label mt-2' htmlFor="currentAddress">موجودہ پتہ</label>
            <input
              className='form-control'
              type="text"
              autoComplete='off'
              onChange={onChangeHandler}
              name="currentAddress"
              id="currentAddress"
              value={studentsForm.currentAddress}/>
            {errors.currentAddress && (
              <div className='text-danger'>{errors.currentAddress}</div>
            )}

            {/* Province select */}
            <select
              className='form-control mt-2'
              onChange={onProvinceChange}
              name="province"
              id="province"
              value={studentsForm.province}
            >
              <option value="">اختیار کریں صوبہ</option>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            {errors.province && (
              <div className='text-danger'>{errors.province}</div>
            )}

            {/* City select */}
            <label className="form-label mt-2" htmlFor="city">
            اختیار کریں شہر
          </label>
          <Select
            options={
              studentsForm.province
                ? cities[studentsForm.province].map((city) => ({
                    value: city,
                    label: city,
                  }))
                : []
            }
            value={
              studentsForm.city
                ? { value: studentsForm.city, label: studentsForm.city }
                : null
            }
            onChange={(selectedOption) =>
              setStudentsForm((prevForm) => ({
                ...prevForm,
                city: selectedOption ? selectedOption.value : '',
              }))
            }
            placeholder="شہر کو تلاش کریں"
            isSearchable={true}
          />
          {errors.city && <div className="text-danger">{errors.city}</div>}



              <label className='form-label mt-2' htmlFor="guardianContact">رابطہ سرپرست</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="numeric"
              maxLength="11"
              pattern="[0-9]*"
              onChange={onChangeHandler}
              name="guardianContact"
              id="guardianContact"
              value={studentsForm.guardianContact}/>
               {errors.guardianContact&&(
          <div className='text-danger'>{errors.guardianContact}</div>
        )}


              <label className='form-label mt-2' htmlFor="dateEntryLunar">تاریخ داخلہ قمری</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="date"
              onChange={onChangeHandler}
              name="dateEntryLunar"
              id="dateEntryLunar"
              value={studentsForm.dateEntryLunar}/>
               {errors.dateEntryLunar&&(
          <div className='text-danger'>{errors.dateEntryLunar}</div>
        )}


              <label className='form-label mt-2' htmlFor="renewalAdmission">تجدید داخلہ</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="renewalAdmission"
              id="renewalAdmission"
              value={studentsForm.renewalAdmission}/>
               {errors.renewalAdmission&&(
          <div className='text-danger'>{errors.renewalAdmission}</div>
        )}


              <label className='form-label mt-2' htmlFor="oldSchool">سابقہ مدرسے کا نام</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="oldSchool"
              id="oldSchool"
              value={studentsForm.oldSchool}/>
               {errors.oldSchool&&(
          <div className='text-danger'>{errors.oldSchool}</div>
        )}


              <label className='form-label mt-2' htmlFor="molarity">تعلیمی و اخلاقی کیفیت</label>
              <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="molarity"
              id="molarity"
              value={studentsForm.molarity}/>
               {errors.molarity&&(
          <div className='text-danger'>{errors.molarity}</div>
        )}



            
            
          </div>



        <div className='col-6'>

        <label className='form-label mt-3' htmlFor="studentFatherName">والد کا نام</label>
          <input
            className='form-control'
            autoComplete='off'
            type="text"
            onChange={onChangeHandler}
            name="studentFatherName"
            id="studentFatherName"
            value={studentsForm.studentFatherName}/>
          {errors.studentFatherName&&(
            <div className='text-danger'>{errors.studentFatherName}</div>
          )}

          <label className='form-label mt-2' htmlFor="studentIdCard">طالب کا شناختی کارڈ</label>
          <input
          className='form-control'
          autoComplete='off'
          type="text"
          maxLength="13"
          pattern="[0-9]*"
          onChange={onChangeHandler}
          name="studentIdCard"
          id="studentIdCard"
          value={studentsForm.studentIdCard}
          placeholder="XXXXX-XXXXXXX-X"
          />
          {errors.studentIdCard&&(
            <div className='text-danger'>{errors.studentIdCard}</div>
          )}

          <label className='form-label mt-2' htmlFor="studentDOB">تاریخ پیدائش</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="date"
            onChange={onChangeHandler}
            name="studentDOB"
            id="studentDOB"
            value={studentsForm.studentDOB}/>
             {errors.studentDOB&&(
          <div className='text-danger'>{errors.studentDOB}</div>
        )}


          <label className='form-label mt-2 ' htmlFor="guardianName">سرپرست کا نام</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="text"
            onChange={onChangeHandler}
            name="guardianName"
            id="guardianName"
            value={studentsForm.guardianName}/>
             {errors.guardianName&&(
          <div className='text-danger'>{errors.guardianName}</div>
        )}


          <label className='form-label mt-2' htmlFor="fatherOccupasion">والدکاپیشہ</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="text"
            onChange={onChangeHandler}
            name="fatherOccupasion"
            id="fatherOccupasion"
            value={studentsForm.fatherOccupasion}/>
             {errors.fatherOccupasion&&(
          <div className='text-danger'>{errors.fatherOccupasion}</div>
        )}


          <label className='form-label mt-2' htmlFor="studentContact">رابطہ طالب علم</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="numeric"
            maxLength="11"
            pattern="[0-9]*"
            onChange={onChangeHandler}
            name="studentContact"
            id="studentContact"
            value={studentsForm.studentContact}/>
                {errors.studentContact&&(
          <div className='text-danger'>{errors.studentContact}</div>
        )}

          <label className='form-label mt-2' htmlFor="contemporaryEducation">عصری تعلیم</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="text"
            onChange={onChangeHandler}
            name="contemporaryEducation"
            id="contemporaryEducation"
            value={studentsForm.contemporaryEducation}/>
                {errors.contemporaryEducation&&(
          <div className='text-danger'>{errors.contemporaryEducation}</div>
        )}

          <label className='form-label mt-2' htmlFor="solarEntryDate">تاریخ داخلہ شمسی</label>
          <input
            className='form-control'
            // required
            autoComplete='off'
            type="date"
            onChange={onChangeHandler}
            name="solarEntryDate"
            id="solarEntryDate"
            value={studentsForm.solarEntryDate}/>
                {errors.solarEntryDate&&(
          <div className='text-danger'>{errors.solarEntryDate}</div>
        )}

<div className='d-flex gap-3'>
  <label className='form-label'>مقیم</label>
  <input
    onChange={onChangeHandler}
    autoComplete='off'
    checked={studentsForm.residential === true}
    type='radio'
    name='residential'
    id='resident'
    value='true'
  />

  <label className='form-label'>غیر مقیم</label>
  <input
    onChange={onChangeHandler}
    autoComplete='off'
    checked={studentsForm.residential === false}
    type='radio'
    name='residential'
    id='nonResident'
    value='false'
  />
</div>

        <label className='form-label mt-3' htmlFor="studentPosition">درجہ</label>
        <select
        className='form-control'
        // required
        autoComplete='off'
        onChange={onChangeHandler}
        name="studentPosition"
        id="studentPosition"
        value={studentsForm.studentPosition}
        >
        <option value="">Select درجہ</option>
        <option value="First">First</option>
        <option value="Second">Second</option>
        <option value="Third">Third</option>
        </select>
        {errors.studentPosition&&(
          <div className='text-danger'>{errors.studentPosition}</div>
        )}

        </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </>
  );
};

export default StudentsForm;
