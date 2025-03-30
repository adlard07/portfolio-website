import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProfessionalPage from "./pages/Professional/ProfessionalPage";
import About from "./pages/About/AboutMePage";
import Projects from "./pages/Projects/Projects";
import Document from "./pages/Projects/Documentation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/professional" element={<ProfessionalPage />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectName" element={<Document />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
