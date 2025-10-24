import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoitureList from './components/VoitureList';
import VoitureForm from './components/VoitureForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VoitureList />} />
        <Route path="/add" element={<VoitureForm />} />
        <Route path="/edit/:id" element={<VoitureForm />} />
      </Routes>
    </Router>
  );
}

export default App;
