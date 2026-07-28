
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';



import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <>

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
    </>
  );

}

export default App;
