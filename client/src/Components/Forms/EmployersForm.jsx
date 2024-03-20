import React, { useState, useEffect } from 'react'; // Importing useEffect
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import EmployeesFormValidation from '../Forms_validation/EmployersFormValidation';
import ProvincesAndCities from './ProvinceCity';
import Select from 'react-select';

const EmployersForm = () => {
    const { user } = useAuthContext();
    const { provinces, cities } = ProvincesAndCities(); // Access provinces and cities arrays

    const [employersForm, setEmployersForm] = useState({
        employersName: '',
        employersFatherName: '',
        employersPosition: '',
        employersDOB: '',
        appointmentDate: '',
        employersIdCard: '',
        currentAddress: '',
        city:'',
        province:'',
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

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        if (name === 'employerIdCard' || name === 'contact') {
          newValue = newValue.replace(/\D/g, '')
      }

        if (type === 'radio') {
            setEmployersForm((prevForm) => ({
                ...prevForm,
                residential: value === 'true', // Convert string value to boolean
            }));
        } else {
            setEmployersForm((prevForm) => ({
                ...prevForm,
                [name]: type === 'checkbox' ? checked : newValue,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = EmployeesFormValidation(employersForm); // Validate form data
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, proceed with submission
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/addEmployer',
                    employersForm,
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
                setEmployersForm({
                    employersName: '',
                    employersFatherName: '',
                    employersPosition: '',
                    employersDOB: '',
                    employersIdCard: '',
                    currentAddress: '',
                    city:'',
                    province:'',
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
        setEmployersForm((prevForm) => ({
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
        <h1 className='text-center mb-4'>ملازمین کا فارم</h1>
        <div className="row">
          <div className='col-6'>
            <label className='form-label' htmlFor="employersName">ملازم کا نام</label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="employersName"
              id="employersName"
              value={employersForm.employersName} />
              {errors.employersName&&(
                <div className='text-danger'>{errors.employersName}</div>
              )}
              
            <label className='form-label' htmlFor="employersPosition">عہدہ</label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="employersPosition"
              id="employersPosition"
              value={employersForm.employersPosition} />
              {errors.employersPosition&&(
                <div className='text-danger'>{errors.employersPosition}</div>
              )}

            <label className='form-label' htmlFor="employersDOB">تاریخ پیدائش</label>
            <input
              className='form-control'
              autoComplete='off'
              type="date"
              onChange={onChangeHandler}
              name="employersDOB"
              id="employersDOB"
              value={employersForm.employersDOB} />
              {errors.employersDOB&&(
                <div className='text-danger'>{errors.employersDOB}</div>
              )}

            <label className='form-label mt-2' htmlFor="currentAddress">موجودہ پتہ</label>
            <input
              className='form-control'
              type="text"
              autoComplete='off'
              onChange={onChangeHandler}
              name="currentAddress"
              id="currentAddress"
              value={employersForm.currentAddress}/>
            {errors.currentAddress && (
              <div className='text-danger'>{errors.currentAddress}</div>
            )}

            {/* Province select */}
            <select
              className='form-control mt-2'
              onChange={onProvinceChange}
              name="province"
              id="province"
              value={employersForm.province}
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
              employersForm.province
                ? cities[employersForm.province].map((city) => ({
                    value: city,
                    label: city,
                  }))
                : []
            }
            value={
              employersForm.city
                ? { value: employersForm.city, label: employersForm.city }
                : null
            }
            onChange={(selectedOption) =>
              setEmployersForm((prevForm) => ({
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
    checked={employersForm.residential === true}
    type='radio'
    name='residential'
    id='resident'
    value='true'
  />

  <label className='form-label'>غیر مقیم</label>
  <input
    onChange={onChangeHandler}
    autoComplete='off'
    checked={employersForm.residential === false}
    type='radio'
    name='residential'
    id='nonResident'
    value='false'
  />
</div>

            <label className='form-label mt-5' htmlFor="Email">ای میل آئی ڈی</label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type="email"
              onChange={onChangeHandler}
              name="Email"
              id="Email"
              value={employersForm.Email} />
              {errors.Email&&(
                <div className='text-danger'>{errors.Email}</div>
              )}
          </div>

          <div className='col-6'>
            <label className='form-label' htmlFor="employersFatherName">والد کا نام</label>
            <input
              className='form-control'
              // required
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="employersFatherName"
              id="employersFatherName"
              value={employersForm.employersFatherName} />
              {errors.employersFatherName&&(
                <div className='text-danger'>{errors.employersFatherName}</div>
              )}

              <label className='form-label' htmlFor="employersIdCard">شناختی کارڈ نمبر</label>
              <input
              className='form-control'
  
              autoComplete='off'
              type="text"
              maxLength="13"
              pattern="[0-9]*"
              onChange={onChangeHandler}
              name="employersIdCard"
              id="employersIdCard"
              placeholder="XXXXX-XXXXXXX-X"
              value={employersForm.employersIdCard}
              />
              {errors.employersIdCard&&(
                <div className='text-danger'>{errors.employersIdCard}</div>
              )}

            <label className='form-label' htmlFor="appointmentDate">تاریخ تقرری</label>
            <input
              className='form-control'
              autoComplete='off'
              type="date"
              onChange={onChangeHandler}
              name="appointmentDate"
              id="appointmentDate"
              value={employersForm.appointmentDate} />
              {errors.appointmentDate&&(
                <div className='text-danger'>{errors.appointmentDate}</div>
              )}

            <label className='form-label' htmlFor="contact">موبائل نمبر</label>
            <input
              className='form-control'
              autoComplete='off'
              type="text"
              maxLength="11"
              onChange={onChangeHandler}
              name="contact"
              id="contact"
              placeholder="03XX-XXXXXXX"
              value={employersForm.contact}
            />
            {errors.contact&&(
                <div className='text-danger'>{errors.contact}</div>
              )}

            <label className='form-label' htmlFor="advertising">مشاہرہ</label>
            <input
              className='form-control'
              autoComplete='off'
              type="text"
              onChange={onChangeHandler}
              name="advertising"
              id="advertising"
              value={employersForm.advertising} />
              {errors.advertising&&(
                <div className='text-danger'>{errors.advertising}</div>
              )}
          </div>
        </div>

        <button className='submit-btn' type="submit">Submit</button>
      </form>
    </>
  );
};

export default EmployersForm;
