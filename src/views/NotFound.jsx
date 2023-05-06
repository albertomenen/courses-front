import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Página no encontrada</h2>
      <p className="error-description">
        Lo sentimos, no hay una URL llamada {location.pathname} en este sitio web.
      </p>
      <Link to="/" className="back-to-home">
        Volver al inicio
      </Link>
    </div>
  );
}
