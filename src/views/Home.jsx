import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'; 
import clientService from '../services/courseService';


export default function Home() {
  const [ setClients] = useState([])

  const getClients = async() => {
    try {
      const response = await clientService.getClients();
      setClients(response)
    } catch (error) {
    }
  }

  useEffect(() => {
    getClients();
  },);


  
  return (
    <div className="home-container">
    <div className="hero-section">
      <h1>Aprende de los mejores</h1>
      <p>Aprende a hacer dinero en la siesta</p>
    </div>
    <div className="course-section">
      <h2>Featured Courses</h2>
      <div className="course-grid">
        <div className="course-card">
          <div className="course-title">Desarrolo Web</div>
          <div className="course-description">Curso para aprender a ser un fullstack developer</div>
          <button className="course-button">Apuntate ahora</button>
        </div>
        <div className="course-card">
          <div className="course-title">Análisis de datos</div>
          <div className="course-description">¿ Quieres aprender a saber lo que hay detrás de los números y convertirte en un experto? </div>
          <button className="course-button">Apuntate ahora</button>
        </div>
        {/* ... */}

      </div>
    </div>
  </div>
  )
}

