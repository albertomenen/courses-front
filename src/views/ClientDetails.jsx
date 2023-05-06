import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clientService from '../services/courseService';

export default function ClientDetails() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const getClient = async () => {
    try {
      const response = await clientService.getClient(clientId);
      setLoading(false);
      setClientData(response);
      setError(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getClient();
  },);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && clientData && (
        <div className="client-details-container">
          <h1>Client Details</h1>
          <p>Name: {clientData.name}</p>
          <p>Surname: {clientData.surname}</p>
          <p>
            Phone: +34
            
              {clientData.phone}
            
          </p>
          <p>
            Email: {clientData.email}{' '}
            <a href={`mailto:${clientData.email}`}>
              <button className="email-btn">Send Email</button>
            </a>
          </p>
          <a
        href={`https://wa.me/${clientData.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        style={{ marginLeft: '10px' }}
      >
        Guasá 
      </a>

      <ul>
       <li>
         Invoice: {clientData.bill}
         <a
           href="https://me.sumup.com/es-es/payment-links"
           target="_blank"
           rel="noopener noreferrer"
           className="btn-sumup"
           style={{ marginLeft: '10px', textDecoration: 'none' }}
         >
           <button className='btn-sumup'>
             Pay Invoice
           </button>
         </a>
       </li>
      </ul>
          
          <p>Description: {clientData.description}</p>
          <p>Bill: {clientData.bill}</p>
        </div>
      )}
      {error && <p>Something went wrong. Couldn't find your client.</p>}
    </div>
  );
}
