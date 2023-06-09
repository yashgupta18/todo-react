import React from 'react'
import axios from "axios";
import { useAuthDispatch } from '../context/AuthContext';
import Button from './Button';
import  {URL}  from '../constants/url';
const Logout = () => {
  const dispatch = useAuthDispatch();
  const handleLogout =async () => {
    try {
      await axios.post(`${URL}/logout`);
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log({err});
    }
    window.location.href = '/login'
  }

  return (
    <div>
      <Button onClick={handleLogout} title="Logout" />
    </div>
  )
}

export default Logout