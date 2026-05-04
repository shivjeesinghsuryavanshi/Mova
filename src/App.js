import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './weather';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
};

export default App;