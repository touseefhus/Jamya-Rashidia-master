const EmployeesFormValidatiion = (formData) => {
  let errors = {};

  if (!formData.employersName || !formData.employersName.trim()) {
      errors.employersName = 'ملازم کا نام درج کریں';
  }
  if (!formData.employersPosition || !formData.employersPosition.trim()) {
      errors.employersPosition = 'ملازم کا عہدہ درج کریں';
  }
  if (!formData.employersDOB || !formData.employersDOB.trim()) {
      errors.employersDOB = 'تاریخ پدائش درج کریں';
  }
  if (!formData.currentAddress || !formData.currentAddress.trim()) {
      errors.currentAddress = 'گھر کا پتہ درج کریں';
  }
  if (!formData.Email || !formData.Email.trim()) {
      errors.Email = 'ای میل درج کریں';
  }
  if (!formData.employersFatherName || !formData.employersFatherName.trim()) {
      errors.employersFatherName = 'ملازم کے والد کا نام درج کریں';
  }
  if (!formData.appointmentDate || !formData.appointmentDate.trim()) {
      errors.appointmentDate = 'تقریری تاریخ درج کریں';
  }
  if (!formData.contact || !formData.contact.trim()) {
      errors.contact = 'موبائل نمبر درج کریں';
  }
  if (!formData.employersIdCard || !formData.contact.trim()) {
      errors.employersIdCard = 'شناختی کارڈ نمبر درج کریں';
  }
  if (!formData.advertising || !formData.advertising.trim()) {
      errors.advertising = 'مشاہرہ درج کریں';
  }
  // Add similar checks for other fields if needed

  return errors;
};

export default EmployeesFormValidatiion;
