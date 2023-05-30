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
        uploadPreset: 'testingRoutes',
      },
      (error, result) => {
        if (error) {
          console.error('Error with Cloudinary upload widget:', error);
        } else if (result.event === 'success') {

          setImageUrl(result.info.url);
        }
      }
    );
  
    widget.open();
  };
    

  if (!course) return <div>Loading...</div>;

   return (
    <div className="course-details-container">
      <section className="course-details-image-section">
        <Image cloudName="myCloudName" publicId={image} width="300" crop="scale" />
        <img className="course-details-image" src={course.imageUrl} alt={course.title} />
      </section>

      <section className="course-details-text-section">
        <h2 className="course-details-title">{course.title}</h2>
        <h3 className="course-details-instructor">Instructor: {course.instructorName}</h3>
        <p className="course-details-description">{course.description}</p>
      </section>

      <section className="course-details-button-section">
        {image && <img src={image} alt="Preview" />}
        <button className='button-courseDetail'>Inscribe ya</button>
      </section>
    </div>
  );
}

