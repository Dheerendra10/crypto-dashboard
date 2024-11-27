import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DashboardView from './components/DashboardView';
import CoinDetailView from './components/CoinDetailView';
import HomePage from './pages/HomePage';
import "./App.css"
 
const App = () => (
  <div className='dark-mode'>
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coin/:id" element={<CoinDetailView />} />
    </Routes>
  </Router>

  </div>
  
);

export default App;
