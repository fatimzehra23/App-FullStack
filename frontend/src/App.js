import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoitureList from './components/VoitureList';
import VoitureForm from './components/VoitureForm';
import ProprietaireList from './components/ProprietaireList';
import ProprietaireForm from './components/ProprietaireForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VoitureList />} />
        <Route path="/voitures" element={<VoitureList />} />
        <Route path="/add" element={<VoitureForm />} />
        <Route path="/edit/:id" element={<VoitureForm />} />
        
        {/* Routes propriétaires */}
        <Route path="/proprietaires" element={<ProprietaireList />} />
        <Route path="/proprietaire/add" element={<ProprietaireForm />} />
        <Route path="/proprietaire/edit/:id" element={<ProprietaireForm />} />
      </Routes>
    </Router>
  );
}

export default App;