import { Navigate } from "react-router-dom";
import React from "react"
import { useAuth } from "../hooks/useAuth";

function IsInstructor({ children }) {

  const { isLoggedIn, isLoading, user } = useAuth();

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || !user.is_instructor) {
    // If the user is not logged in or not an instructor
    return <Navigate to="/login" />; 
  } else {
    // If the user is logged in and is an instructor, allow to see the page 
    return children;
  }
}

export default IsInstructor;
