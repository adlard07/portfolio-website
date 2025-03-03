import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProfessionalPage from './pages/ProfessionalPortfolio';
import Memes from './pages/Memes';
import Books from './pages/Books'
import Projects from './pages/Projects'
import TwitterTweeter from './pages/TheyDontKnowMeSon/TwitterBot';
import DiscordSpotifyYoutube from './pages/TheyDontKnowMeSon/DiscordBot';
import QuantTradingStrategy from './pages/TheyDontKnowMeSon/QuantTrader';
import BudgetTrackerApp from './pages/TheyDontKnowMeSon/BudgetTrackerApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/professional" element={<ProfessionalPage />} />
        <Route path="/memes" element={<Memes />} />
        <Route path="/books" element={<Books />} />
        <Route path="/projects/quantitative-trading-strategy-with-sentiment-and-risk-analysis" element={<QuantTradingStrategy />} />
        <Route path="/projects/discord-X-spotify-X-youtube" element={<DiscordSpotifyYoutube />} />
        <Route path="/projects/twitter-tweeter" element={<TwitterTweeter />} />
        <Route path="/projects/budget-tracker" element={<BudgetTrackerApp />} />
      </Routes>
    </Router>
  );
}

export default App;