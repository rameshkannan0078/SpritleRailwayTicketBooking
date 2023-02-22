import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRouteAgent({ children }) {
  const currentUser  =window.localStorage.getItem('Agent_Email');

  if (!currentUser) {
    return <Navigate to='/' />
  }

  return children;
}

