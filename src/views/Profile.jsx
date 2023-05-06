import React, { useContext, useState, useEffect }from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from "../services/userService"


export default function ProfileUser() {
    
    const { isLoggedIn } = useContext(AuthContext); 
    const [user, setUser ] = useState({})
    const getProfile = async () => {
        try {
            const response = await userService.getUser(user);
            setUser(response.user);
            } catch (error) {
            console.error(error);
            }
        }

        useEffect(() => {
            getProfile();
                    // eslint-disable-next-line
        }, []);

    return (
        <>
        {isLoggedIn &&user&& 
        <div className="profile">
            <h2>Hola {user.username}</h2>
            <p>This is your email: {user.email}</p>
            <Link to={`/user/edit/${user._id}`}><div>Edit Profile</div></Link>
        </div>}</>
    )
}