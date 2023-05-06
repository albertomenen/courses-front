import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clientService from '../services/courseService';

export default function EditClient() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const getClient = async () => {
    try {
      const response = await clientService.getClient(clientId);
      setLoading(false);
      setClientData(response);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getClient();
  }, );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientService.editClient(clientId, clientData);
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate(`/client/${clientId}`);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && clientData && (
        <div className="edit-client-container">
          <h1>Edit Client</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={clientData.name}
              onChange={handleChange}
            />
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={clientData.surname}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={clientData.email}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={clientData.description}
              onChange={handleChange}
            />
            <label htmlFor="bill">Bill:</label>
            <input
              type="text"
              id="bill"
              name="bill"
              value={clientData.bill}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      {error && <p>Something went wrong. Couldn't find your client.</p>}
      {updateSuccess && <p>Client updated successfully!</p>}
    </div>
  );
}
