const StudentFormValidation = (formData) => {

    let shallValidate = true;


    let errors = {};
    if(shallValidate){
        if (!formData || !formData.studentName || !formData.studentName.trim()) {
            errors.studentName = 'نام درج کریں';
        }
        if (!formData || !formData.studentFatherName || !formData.studentFatherName.trim()) {
            errors.studentFatherName = 'والد کا نام درج کریں';
        }
        if (!formData || !formData.jamiaMoney || !formData.jamiaMoney.trim()) {
            errors.jamiaMoney = 'تنخواہ درج کریں';
        }
        if (!formData || !formData.studentIdCard || !formData.studentIdCard.trim()) {
            errors.studentIdCard = 'شناختی کارڈ درج کریں';
        }
        if (!formData || !formData.studentPic) {
            errors.studentPic = 'تصایر کا انتخاب کریں';
        } else if (typeof formData.studentPic !== 'object') {
            errors.studentPic = 'Invalid picture format';
        }
        
        
        if (!formData || !formData.studentDOB || !formData.studentDOB.trim()) {
            errors.studentDOB = 'تاریخ درج کریں';
        }
        if (!formData || !formData.guardianIdCard || !formData.guardianIdCard.trim()) {
            errors.guardianIdCard = 'سرپرست کا شناختی کارڈ';
        }
        if (!formData || !formData.fatherOccupasion || !formData.fatherOccupasion.trim()) {
            errors.fatherOccupasion = 'والد کا پیشہ درج کریں';
        }
        if (!formData || !formData.currentAddress || !formData.currentAddress.trim()) {
            errors.currentAddress = 'پتہ درج کریں';
        }
        if (!formData || !formData.studentContact || !formData.studentContact.trim()) {
            errors.studentContact = 'موبائل نمبر درج کریں';
        }
        if (!formData || !formData.contemporaryEducation || !formData.contemporaryEducation.trim()) {
            errors.contemporaryEducation = 'عصری تعلیم درج کریں';
        }
        if (!formData || !formData.dateEntryLunar || !formData.dateEntryLunar.trim()) {
            errors.dateEntryLunar = 'تاریخ داخلہ قمری درج کریں';
        }
        if (!formData || !formData.solarEntryDate || !formData.solarEntryDate.trim()) {
            errors.solarEntryDate = 'شمسی تاریخ درج کریں';
        }
        if (!formData || !formData.renewalAdmission || !formData.renewalAdmission.trim()) {
            errors.renewalAdmission = 'تجدید داخلہ درج کریں';
        }
        if (!formData || !formData.oldSchool || !formData.oldSchool.trim()) {
            errors.oldSchool = 'سابقہ مدرسہ کا نام درج کریں';
        }
        if (!formData || !formData.molarity || !formData.molarity.trim()) {
            errors.molarity = 'تعلیمی و اخلاقی کیفیت درج کریں';
        }
        if (!formData || !formData.studentPosition || !formData.studentPosition.trim()) {
            errors.studentPosition = 'طالبات کا درجہ';
        }
        if (!formData || !formData.guardianContact || !formData.guardianContact.trim()) {
            errors.guardianContact = 'سرپرست کا موبائل نمبر درج کریں';
        }
    }
  

    return errors;
};

export default StudentFormValidation;
