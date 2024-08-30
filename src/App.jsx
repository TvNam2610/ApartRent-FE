
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import PropertyList from './pages/PropertyList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyList />} />
          {/* Thêm các route khác khi cần */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;