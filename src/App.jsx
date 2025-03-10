import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import '@components/charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Profile from "./pages/Profile";
import About from "./pages/About";
import Details from './pages/Details';
import { SignIn, SignUp, ForgotPassword } from './pages/Auth';
import Templates from './pages/Templates';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <div className='page-transition'>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/activities" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </div>
  );
}

export default App;
