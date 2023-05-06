import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course, handleDelete }) {
  const { title, instructor, imageUrl, description, _id } = course;

  const handleDeleteCourse = () => {
    handleDelete(_id);
  };

  return (
    <div className="course-card">
      <div className="course-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="course-card-overlay">
          <button className="course-card-btn" onClick={handleDeleteCourse}>Delete</button>
          <button className="course-card-btn"><Link to={`/edit/${_id}`}>Edit</Link></button>
        </div>
      </div>
      <div className="course-card-content">
        <h3>{title}</h3>
        <p>Instructor: {instructor}</p>
        <p>{description}</p>
        <button className="course-card-details-btn">
          <Link to={`/course/${course._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}
