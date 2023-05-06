import React, { useState, useEffect, useContext } from 'react';
import ListCard from '../components/ListCard';
import listService from '../services/listService';
import clientService from '../services/courseService';
import { AuthContext } from '../context/AuthContext';


export default function ListView() {

    const [lists, setLists] = useState([]);
    const [ setClients] = useState([]);
    const {user} = useContext(AuthContext)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listService.getList(user._id);
        const clientData = await clientService.getClients();
        setLists(data);
        setClients(clientData);
      } catch (error) {
        console.log("error",)
      }
    };

    fetchData();
  }, );

  const handleDelete = async (listId) => {
    try {
      await listService.deleteList(listId);
      setLists(lists.filter(list => list._id !== listId));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };
  // const getClientNameById = async (id) => {
  //   const data = await listService.getList(id)
  //   return data
  // };
    
  return (
    <div>
    <ul>
      {lists.map((list) => (
        <li key={list._id}>
          <ListCard list={list} handleDelete={handleDelete}/>
        </li>
      ))}
    </ul>
  </div>
  );
}