import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProfessionalPage from './pages/ProfessionalPortfolio';
import Memes from './pages/Memes';
import Books from './pages/Books'
import Projects from './pages/Projects'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/professional" element={<ProfessionalPage />} />
        <Route path="/memes" element={<Memes />} />
        <Route path="/books" element={<Books />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;