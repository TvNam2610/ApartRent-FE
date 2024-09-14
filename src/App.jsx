import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import PropertyList from './pages/ListProperty/ListProperty.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/for-rent" element={<PropertyList />} />
                    <Route path="/for-buy" element={<PropertyList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
