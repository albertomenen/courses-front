import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';

export default function ListCard({ list, handleDelete }) {
  const { client, _id } = list;
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission not granted');
    }
  };

  const showReminderNotification = () => {
    new window.Notification('Reminder', {
      body: `It's time to contact ${client.name} ${client.surname}`,
    });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    console.log('Selected date:', date);

    const currentDate = new Date();
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()&&
      date.getHours() === currentDate.getHours() &&
      date.getMinutes() === currentDate.getMinutes()
    ) {
      showReminderNotification();
    }
  };

  const handleDeleteList = () => {
    handleDelete(_id);
  };

  // Meter GetClientNameById 


  return (
    <div className="card">
      <h3>
        Client:{' '}
        {client
          ? `${client.name} ${client.surname} Description: ${client.description}`
          : ''}
      </h3>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd h:mm aa"
        className="date-picker"
      />
      
      <ul>
       <li>
         Invoice: {client.bill}
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
      <button onClick={handleDeleteList}>Delete</button>
    </div>
  );
}
