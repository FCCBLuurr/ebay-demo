import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import mainTheme from './themes/mainTheme';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import DataEntry from './pages/DataEntry';
import SalesChannelHibid from './pages/SalesChannelHibid';
import SalesChannelEbay from './pages/SalesChannelEbay';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dataentry" element={<DataEntry />} />
          <Route path="/saleschannels/hibid" element={<SalesChannelHibid />} />
          <Route path="/saleschannels/ebay" element={<SalesChannelEbay />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
