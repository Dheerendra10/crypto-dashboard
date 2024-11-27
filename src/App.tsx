import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DashboardView from './components/DashboardView';
import CoinDetailView from './components/CoinDetailView';
import HomePage from './pages/HomePage';
 
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coin/:id" element={<CoinDetailView />} />
    </Routes>
  </Router>
);

export default App;
