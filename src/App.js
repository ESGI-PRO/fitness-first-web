import React from 'react';
import { Box } from '@mui/material';

import './App.css';
import './assets/css/styles.css';
// fonts
import './assets/fonts/Montserrat-Bold.ttf';
import './assets/fonts/Montserrat-Regular.ttf';
import './assets/fonts/Montserrat-Medium.ttf';
import './assets/fonts/Montserrat-ExtraBold.ttf';
import './assets/fonts/Montserrat-SemiBold.ttf';
import './assets/fonts/Montserrat-Light.ttf';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// routes
import Router from './routes';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
return (
  <><Box width="100%" sx={{ backgroundColor: '#F8F8F8' }}></Box><Box width="400px" sx={{ width: { xl: '1488px' } }} className="mx-16">
    {location.pathname === '/' && <Navbar />}
    <Router />
    {location.pathname === '/' && <Footer />}

  </Box></>
)
};

export default App;
