import './App.css';
import React from "react"
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import IsInstructor from './components/isInstructor';
import Login from './views/auth/Login';
import AddClient from "./components/addCourse.jsx"
import AddList from './components/addList';
import Footer from "./components/Footer"
import ClientCard from "./components/CourseCard"
import PrivateView from './views/PrivateView';
import ListView from './views/ListView';
import IsPrivate from './components/IsPrivate';
import EditClient from './views/EditClient';
import ClientDetails from './views/ClientDetails';
import UserEdit from './views/UserEdit';
import Profile from "./views/Profile"
import InstructorView from './views/InstructorView';
import './index.css';


function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/list" element={<ListView />} /> 
        <Route path="/addClient" element={<AddClient />} /> 
        <Route path="/instructor" element={<IsInstructor><InstructorView /></IsInstructor>} /> 
        <Route path="/client/:clientId" element={<ClientDetails/>} />
        <Route path="/edit/:clientId" element={<EditClient />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/addList" element={<AddList />} />       
        <Route path="/clientCard" element={<ClientCard />} /> 
        <Route path="/user/edit/:userId" element={<UserEdit />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
