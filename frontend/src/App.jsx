import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import style from './App.module.css';
import './fonts.css';
import Navigate from './Navigate/Navigate';
import Main from './Main/Main';
import Login from './Form/Login/Login';
import Register from './Form/Register/Register';
import Profilekur from './Profile/Profilekur';
import Service from './Service/Service';
import Profile from './Profile/Profile'

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/register' || location.pathname === '/service/latex') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [location.pathname]);

  return (
    <>
      <Navigate />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profilekur" element={<Profilekur />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/service/*' element={<Service />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
