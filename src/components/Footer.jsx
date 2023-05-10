import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>
            Teléfono: +34 (542) 657-435<br />
            Correo electrónico: ayuda@siestafunds.com
          </p>
        </div>
        <div className="footer-address">
          <h4>Dirección</h4>
          <p>
            Carrer Marques del Campo Sagrado 54<br />
            08015 Barcelona, España
          </p>
        </div>
        <div className="footer-social">
          <h4>Síguenos</h4>
          <p>
            Facebook | Twitter | Instagram
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
