import React, { useState } from 'react';


export default function AddClient({handleAddClient}) {
  const [clientData, setClientData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    bill: '',
  });



  const handleChange = (event) => {
    setClientData({ ...clientData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddClient(clientData);
  };

  return (
    <div className="add-client-container">
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="surname">Apellido:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={clientData.surname}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Número de teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={clientData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={clientData.email}
          onChange={handleChange}
          required
        />
         <label htmlFor="description">Description: </label>
        <input
          type="desc"
          id="description"
          name="description"
          value={clientData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="bill">Factura:</label>
        <input
          type="text"
          id="bill"
          name="bill"
          value={clientData.bill}
          onChange={handleChange}
          required
        />
        <button type="submit" >Agregar cliente</button>
      </form>
    </div>
  );
}
