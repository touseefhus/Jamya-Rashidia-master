import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import TeachersFormValidation from '../Forms_validation/TeachersFormValidation';
import ProvincesAndCities from './ProvinceCity';
import Select from 'react-select';

const TeachersForm = () => {
    const { user } = useAuthContext();
    const { provinces, cities } = ProvincesAndCities(); // Access provinces and cities arrays
    const [teachersForm, setTeachersForm] = useState({
        teacherName: '',
        teacherFatherName: '',
        teacherPosition: '',
        teacherDOB: '',
        appointmentDate: '',
        teacherIdCard: '',
        currentAddress: '',
        province:'',
        city:'',
        contact: '',
        residential: {
            resident: true,
            nonResident: false,
        },
        advertising: '',
        Email: '',
    });
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        let timeout;
        if (submitSuccess) {
            timeout = setTimeout(() => {
                setSubmitSuccess(false);
            }, 2000); // 2000 milliseconds = 2 seconds
        }

        return () => clearTimeout(timeout);
    }, [submitSuccess]);

    const onChangeHandler = (event) => {
        const { name, value, type, checked } = event.target;
        let newValue = value;

        // Clear the error message for the current field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        if (name === 'teacherIdCard' || name === 'contact') {
            newValue = newValue.replace(/\D/g, '')
        }

        if (type === 'radio') {
            setTeachersForm((prevForm) => ({
                ...prevForm,
                residential: value === 'true', // Convert string value to boolean
            }));
        } else {
            setTeachersForm((prevForm) => ({
                ...prevForm,
                [name]: type === 'checkbox' ? checked : newValue,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = TeachersFormValidation(teachersForm); // Validate form data
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, proceed with submission
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/addTeacher',
                    teachersForm,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.accessToken}`,
                        },
                    }
                );

                console.log('Response Data:', response.data);

                // Display success prompt
                setSubmitSuccess(true);

                // Reset the form after successful submission
                setTeachersForm({
                    teacherName: '',
                    teacherFatherName: '',
                    teacherPosition: '',
                    teacherDOB: '',
                    teacherIdCard: '',
                    currentAddress: '',
                    province:'',
                    city:'',
                    contact: '',
                    appointmentDate: '',
                    advertising: '',
                    Email: '',
                });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Form is invalid, update errors state
            setErrors(validationErrors);
        }
    };

    const onProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setTeachersForm((prevForm) => ({
            ...prevForm,
            province: selectedProvince,
            city: '', // Reset the city when province changes
        }));
    };
  


  return (
    <>
     {submitSuccess && ( // Display success prompt if submitSuccess is true
        <div className="alert alert-success" role="alert">
         فارم کا اندراج کامیابی سے ہو چکا
        </div>
      )}
      <form action='' onSubmit={handleSubmit}>
        <h1 className='text-center mb-4'>استاتذہ کا فارم</h1>
        <div className='row'>
          <div className='col-6'>
            <label className='form-label' htmlFor='teacherName'>
              استاد کا نام
            </label>
            <input
              className='form-control'
              autoComplete='off'
              type='text'
              onChange={onChangeHandler}
              name='teacherName'
              id='teacherName'
              value={teachersForm.teacherName}
            />
             {errors.teacherName && (
              <div className="text-danger">{errors.teacherName}</div>
              )}

            <label className='form-label' htmlFor='teacherPosition'>
              عہدہ
            </label>
            <input
              className='form-control'
              autoComplete='off'
              type='text'
              onChange={onChangeHandler}
              name='teacherPosition'
              id='teacherPosition'
              value={teachersForm.teacherPosition}
            />
            {errors.teacherPosition&&(
              <div className='text-danger'>{errors.teacherPosition}</div>
            )}

            <label className='form-label' htmlFor='teacherDOB'>
              تاریخ پیدائش
            </label>
            <input
              className='form-control'
              autoComplete='off'
              type='date'
              onChange={onChangeHandler}
              name='teacherDOB'
              id='teacherDOB'
              value={teachersForm.teacherDOB}
            />
             {errors.teacherDOB&&(
              <div className='text-danger'>{errors.teacherDOB}</div>
            )}

<label className='form-label mt-2' htmlFor="currentAddress">موجودہ پتہ</label>
            <input
              className='form-control'
              type="text"
              autoComplete='off'
              onChange={onChangeHandler}
              name="currentAddress"
              id="currentAddress"
              value={teachersForm.currentAddress}/>
            {errors.currentAddress && (
              <div className='text-danger'>{errors.currentAddress}</div>
            )}

            {/* Province select */}
            <select
              className='form-control mt-2'
              onChange={onProvinceChange}
              name="province"
              id="province"
              value={teachersForm.province}
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
              teachersForm.province
                ?cities[teachersForm.province].map((city) => ({
                    value: city,
                    label: city,
                  }))
                : []
            }
            value={
              teachersForm.city
                ? { value: teachersForm.city, label: teachersForm.city }
                : null
            }
            onChange={(selectedOption) =>
              setTeachersForm((prevForm) => ({
                ...prevForm,
                city: selectedOption ? selectedOption.value : '',
              }))
            }
            placeholder="شہر کو تلاش کریں"
            isSearchable={true}
          />
          {errors.city && <div className="text-danger">{errors.city}</div>}


<div className='d-flex gap-3'>
  <label className='form-label'>مقیم</label>
  <input
    onChange={onChangeHandler}
    autoComplete='off'
    checked={teachersForm.residential === true}
    type='radio'
    name='residential'
    id='resident'
    value='true'
  />

  <label className='form-label'>غیر مقیم</label>
  <input
    onChange={onChangeHandler}
    autoComplete='off'
    checked={teachersForm.residential === false}
    type='radio'
    name='residential'
    id='nonResident'
    value='false'
  />
</div>

            <label className='form-label mt-5' htmlFor='email'>
              ای میل آئی ڈی
            </label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type='email'
              onChange={onChangeHandler}
              name='Email'
              id='email'
              value={teachersForm.Email}
            />
            {errors.Email&&(
              <div className='text-danger'>{errors.Email}</div>
            )}
          </div>

          <div className='col-6'>
            <label className='form-label' htmlFor='teacherFatherName'>
              والد کا نام
            </label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type='text'
              onChange={onChangeHandler}
              name='teacherFatherName'
              id='teacherFatherName'
              value={teachersForm.teacherFatherName}
            />
            {errors.teacherFatherName &&(
              <div className='text-danger'>{errors.teacherFatherName}</div>
            )}

            <label className='form-label' htmlFor='teacherIdCard'>
           شناختی کارڈ نمبر
            </label>
            <input
          className='form-control'
 
          autoComplete='off'
          type="text"
          maxLength="13"
          pattern="[0-9]*"
          onChange={onChangeHandler}
  
          name="teacherIdCard"
          id="teacherIdCard"
          placeholder="XXXXX-XXXXXXX-X"
          value={teachersForm.teacherIdCard}
              />
          {errors.teacherIdCard&&(
            <div className='text-danger'>{errors.teacherIdCard}</div>
          )}



          <label className='form-label' htmlFor='appointmentDate'>
              تاریخ تقرری
          </label>
            <input
              className='form-control'
              autoComplete='off'
              type='date'
              onChange={onChangeHandler}
              name='appointmentDate'
              id='appointmentDate'
              value={teachersForm.appointmentDate}
            />
            {errors.appointmentDate&&(
            <div className='text-danger'>{errors.appointmentDate}</div>
          )}

            

            <label className='form-label' htmlFor='contact'>
          موبائل نمبر   
            </label>
            <input
              className='form-control'
              autoComplete='off'
              type="text"
              maxLength="11"
              onChange={onChangeHandler}
              name="contact"
              id="contact"
              placeholder="03XX-XXXXXXX"
              value={teachersForm.contact}
            />
             {errors.contact&&(
            <div className='text-danger'>{errors.contact}</div>
          )}


            <label className='form-label' htmlFor='advertising'>
              مشاہرہ
            </label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type='text'
              onChange={onChangeHandler}
              name='advertising'
              id='advertising'
              value={teachersForm.advertising}
            />
            {errors.advertising&&(
            <div className='text-danger'>{errors.advertising}</div>
          )}
          </div>
        </div>

        <button className='submit-btn' type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default TeachersForm;
