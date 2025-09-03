import { Routes, Route, Link } from "react-router-dom";
import InputPage from "./pages/InputPage";
import InfographicPage from "./pages/InfographicPage";
import SyllabusPage from "./pages/SyllabusPage";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="PathViz Home">PathViz</Link>
          <nav>
            <Link to="/" className="nav-link">Generate</Link>
            <Link to="/history" className="nav-link">History</Link>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/syllabus/:id" element={<InfographicPage />} />
          <Route path="/syllabus/:id" element={<SyllabusPage />} />
          <Route path="/history" element={<InputPage showHistoryOnly />} />
        </Routes>
      </main>

    </div>
  );
}
