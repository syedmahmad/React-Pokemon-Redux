import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home';
import SpecificPokemon from './components/SpecificPokemon';
const App = () => {
  return (
    <>
    {/* Routing is done here */}
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to="/1" />} /> 
        <Route path='/:id' element={<Home />} />
      <Route path='/:name/:url' element={<SpecificPokemon />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
