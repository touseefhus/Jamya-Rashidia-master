const TeachersFormValidation = (formData) => {
  let errors = {};

  if (!formData.teacherName.trim()) {
      errors.teacherName = 'استادکا نام درج کریں';
  }
  if(!formData.teacherPosition.trim()){
    errors.teacherPosition='استاد کا عہدہ درج کریں'
  }
  if(!formData.teacherDOB.trim()){
    errors.teacherDOB='تاریخ پیدائش درج کریں'
  }
  if(!formData.currentAddress.trim()){
    errors.currentAddress='گھر کا پتہ درج کریں'
  }
  if(!formData.Email.trim()){
    errors.Email='ای میل دررج کریں'
  }
  if(!formData.teacherFatherName.trim()){
    errors.teacherFatherName='والد کا نام درج کریں'
  }
  if(!formData.teacherIdCard.trim()){
    errors.teacherIdCard='شناختی کارڈ نمبر درج کریں'
  }
  if(!formData.appointmentDate.trim()){
    errors.appointmentDate='تقریری تاریخ درج کریں'
  }
  if(!formData.contact.trim()){
    errors.contact='موبوئل نمبر درج کریں'
  }
  if(!formData.advertising.trim()){
    errors.advertising='مشاہرہ درج کریں'
  }


  return errors;
};

export default TeachersFormValidation;
