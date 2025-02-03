import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WeatherPage from './pages/weather/WeatherPage';
import About from './pages/about/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="bg-[#f8f9fa] w-screen h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;