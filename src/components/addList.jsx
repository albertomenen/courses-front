import React, { useState } from 'react';

export default function AddList({handleAddList}) {
  const [listData, setListData] = useState({
    name: '',
    client: ""
  });



  const handleChange = (event) => {
    setListData({ ...listData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddList(listData);
  };

  return (
    <div className="add-client-container">
      <h1>Add List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          value={listData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="client">Client:</label>
        <input
          type="tel"
          name="client"
          value={listData.client}
          onChange={handleChange}
          required
        />
        <button  type="submit">Agregar Lista</button>
      </form>
    </div>
  );
}
