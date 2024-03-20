import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalStudents = () => {
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await axios.get('/viewStudents/count');
                setStudentCount(response.data.count);
            } catch (error) {
                console.error('Error fetching student count:', error);
            }
        };

        fetchStudentCount();
    }, []);

    return (
        <>
        <div>
            <p>Total Students: {studentCount}</p>
        </div>


    <section className='socialMedia d-flex gap-5'>
        <a 
        href="https://www.instagram.com"
        className='bi bi-instagram'
        aria-label="Instagram">
        </a>
        <a 
        href="https://www.youtube.com"
        className='bi bi-youtube'
        aria-label="Instagram">
        </a>
        <a 
        href="https://www.whatsapp.com"
        className='bi bi-whatsapp'
        aria-label="Instagram">
        </a>
        <a 
        href="https://www.facebook.com"
        className='bi bi-facebook'
        aria-label="Instagram">
        </a>
    </section>

        </>
    );
};

export default TotalStudents;
