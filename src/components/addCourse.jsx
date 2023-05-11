import React, { useState } from 'react';

export default function AddCourse({ handleAddCourse }) {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    instructor: '',
  });

  const handleChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCourse(courseData);
  };

  return (
    <div className="add-course-container">
      <h1>Añadir curso</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={courseData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="instructor">Instructor:</label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          value={courseData.instructor}
          onChange={handleChange}
          required
        />
        <button type="submit">Añadir curso</button>
      </form>
    </div>
  );
}
