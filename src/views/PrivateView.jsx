import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CourseCard from '../components/CourseCard';
import courseService from '../services/courseService';
import AddCourse from "../components/addCourse"
import {AuthContext} from "../context/AuthContext"

export default function CoursesView() {
  const [courses, setCourses] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data);
      } catch (error) {
        console.log("error",)
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await courseService.deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const navigate = useNavigate();

  const handleAddCourse = async (newCourseData) => {
    try {
      const newCourse = await courseService.createCourse(newCourseData);
      console.log('New course:', newCourse); 
      navigate(`/courses/${newCourse._id}`)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <AddCourse handleAddCourse={handleAddCourse}/>
      <h3>All courses:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <CourseCard course={course} handleDelete={handleDelete} handleAddCourse={handleAddCourse} />
          </li>
        ))}
      </ul>
    </div>
  );
}
