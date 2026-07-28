import React from 'react';
<<<<<<< HEAD
import LandingPage from './pages/LandingPage';

function App() {
  return <LandingPage />;
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<LandingPage />} />
        <Route path="/collections" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
}

export default App;
