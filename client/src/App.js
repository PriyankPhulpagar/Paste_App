// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pastes from './components/Pastes';
import PasteView from './components/Pasteview';
import EditPaste from './components/EditPaste'; // ✅ Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path="/edit/:id" element={<EditPaste />} /> {/* ✅ Updated route */}
        <Route path="/pastes/:id" element={<PasteView />} />
      </Routes>
    </Router>
  );
}

export default App;
