import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {AuthContext} from "../context/AuthContext"
import instructorService from "../services/instructorService"


export default function InstructorView() {
  const [instructors, setInstructors] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await instructorService.getInstructors();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };
  
    fetchInstructors();
  }, []);
  

 return (
    <div className="instructor-list">
      <h3>Lista de Instructores:</h3>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id}>
            <h2>{instructor.name} {instructor.surname}</h2>
            <img src={instructor.profilePic} alt={`${instructor.name}'s profile`} />
            <p>{instructor.bio}</p>
            <p>{instructor.credentials}</p>
            <a href={instructor.website}>Website</a>
            <div>
              <h3>Enlaces de redes sociales:</h3>
              {instructor.socialLinks.map((link, index) => (
                <a key={index} href={link.url}>{link.platform}</a>
              ))}
            </div>
            <div>
              <h3>Cursos impartidos:</h3>
              {instructor.coursesTaught.map((course, index) => (
                <div key={index}>{course.title}</div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}


