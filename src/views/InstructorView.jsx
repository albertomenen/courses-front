import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CourseCard from '../components/CourseCard';
import AddCourse from "../components/addCourse"
import {AuthContext} from "../context/AuthContext"
import instructorService from "../services/instructorService"
import courseService from '../services/courseService';


export default function InstructorView() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const [instructor, setInstructor] = useState(null)
  // const { name, surname, profilePic, bio, credentials, website, coursesTaught, socialLinks, email } = instructor;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const instructorData = await instructorService.getInstructor(user.name); // Reemplaza esto con tu propia lógica de API
        setInstructor(instructorData);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };
  
    fetchInstructorData();
  }, [user]);
  

  const handleDelete = async (courseId) => {
    try {
      await courseService.deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleAddCourse = async (newCourseData) => {
    try {
      const newCourse = await courseService.createCourse({...newCourseData, instructor: user.name});
      console.log('New course:', newCourse); 
      setCourses(prevCourses => [...prevCourses, newCourse])
      navigate(`/course/${newCourse._id}`);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <AddCourse handleAddCourse={handleAddCourse}/>
      <h3>Tus cursos:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <CourseCard course={course} handleDelete={handleDelete} />
          </li>
        ))}
      </ul>

      {instructor && (
        <div>
          <h2>{instructor?.name} {instructor?.surname}</h2>
          <img src={instructor?.profilePic} alt={`${instructor?.name}'s profile`} />
          <p>{instructor?.bio}</p>
          <p>{instructor?.credentials}</p>
          <a href={instructor?.website}>Website</a>
          <div>
            <h3>Enlaces de redes sociales:</h3>
            {instructor?.socialLinks.map((link, index) => (
              <a key={index} href={link.url}>{link.platform}</a>
            ))}
          </div>
          <div>
            <h3>Cursos impartidos:</h3>
            {instructor?.coursesTaught.map((course, index) => (
              <div key={index}>{course.title}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

}


