import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../services/courseService';

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await courseService.getCourse(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <h3>Instructor: {course.instructor}</h3>
      <p>{course.description}</p>
      <img src={course.imageUrl} alt={course.title} />
    </div>
  );
}
