import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRouteSuperAdmin({ children }) {
 
  const currentUser  =window.localStorage.getItem('SuperAdmin_Email');

  if (!currentUser) {
    return <Navigate to='/' />
  }

  return children;
}



