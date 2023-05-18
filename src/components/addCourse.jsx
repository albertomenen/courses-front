import React, { useState } from 'react';

export default function AddCourse({ handleAddCourse }) {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    instructor: '',
  });
  const [image, setImageUrl] = useState(null);


  const handleChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCourse(courseData);
  };

  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.cloudname,
        uploadPreset: process.env.CLOUD_API_PREFERENCES,
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
        <label htmlFor="image">Course Image:</label>
        <button onClick={handleUpload}>Upload Image</button>
        {image && <img src={image} alt="Preview" />}

        <button type="submit">Añadir curso</button>
      </form>
    </div>
  );
}
