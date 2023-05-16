import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../services/courseService';
import { Image } from 'cloudinary-react';


export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [image, setImageUrl] = useState(null);
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

 
  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.cloudname,
        uploadPreset: 'myUploadPreset',
      },
      (error, result) => {
        if (error) {
          console.error('Error with Cloudinary upload widget:', error);
        } else if (result.event === 'success') {
          // Guarda el URL de la imagen en el estado de tu componente
          setImageUrl(result.info.url);
        }
      }
    );
  
    widget.open();
  };
    

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-details-container">
      <Image cloudName="myCloudName" publicId={image} width="300" crop="scale" />
      <img className="course-details-image" src={course.imageUrl} alt={course.title} />
      <h2 className="course-details-title">{course.title}</h2>
      <h3 className="course-details-instructor">Instructor: {course.instructor}</h3>
      <p className="course-details-description">{course.description}</p>
      {image && <img src={image} alt="Preview" />}
      <button onClick={handleUpload}>Upload Image</button>
      
    </div>
  );
}
