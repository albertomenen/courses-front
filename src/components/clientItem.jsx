import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import clientService from '../services/clientService';


const ClientList = () => {
  const [clients, setClients] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);

  const fetchClients = async () => {
    if (!isLoggedIn) return;

    try {
      const clientsData = await clientService.getClientsByUserId(user._id);
      setClients(clientsData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, );

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            {client.name} {client.surname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
