import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RepoOverview from './components/RepoOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/overview/:repoName" element={<RepoOverview />} />
      </Routes>
    </Router>
  );
}

export default App;