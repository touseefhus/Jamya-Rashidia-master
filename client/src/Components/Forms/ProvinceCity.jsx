// import React from 'react';

const ProvincesAndCities = () => {
  const provinces = ['Punjab', 'Sindh', 'KPK', 'Balouchistan'];
  const cities = {
    'Punjab': ['Sahiwal',
                'Lahore',
                'Okara',
                'Multan',
                'Faisalabad',
                'Gujranwala',
                'Sialkot',
                    ],
    'Sindh': ['Karachi', 'Hyderabad', 'Sakhar'],
    'KPK': ['Dera Ismail Khan', 'Kohat', 'Peeshawar'],
    'Balouchistan':['Quetta','Gwadar','Turbat','Khuzdar','Chaman','Sibi','Zhob','Loralai','Kharan']
  };

  return { provinces, cities };
};

export default ProvincesAndCities;
