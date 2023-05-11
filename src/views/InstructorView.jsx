import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CourseCard from '../components/CourseCard';
import courseService from '../services/courseService';
import AddCourse from "../components/addCourse"
import {AuthContext} from "../context/AuthContext"

export default function InstructorView() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await courseService.getCourses();
        const userCourses = data.filter(course => course.instructor === user.name); // Asegúrate de que la propiedad 'instructor' exista en el objeto 'course' y contenga el nombre del instructor
        setCourses(userCourses);
      } catch (error) {
        console.log("error",)
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
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
    </div>
  );
}


