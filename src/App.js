import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DragonBallProvider } from './context/DragonBallContext';
import HomePage from './assets/Pages/HomePage';
import CharacterPage from './assets/Pages/CharactersPage.jsx';
import CharacterDetail from './components/CharacterDetail';
import NavbarHome from './components/NavbarHome';
import './index.css';

function App() {
  return (
    <DragonBallProvider>
      <Router>
        <NavbarHome />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharacterPage />} />
          <Route path="/character/:name" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </DragonBallProvider>
  );
}

export default App;
