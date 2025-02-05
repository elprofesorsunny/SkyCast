import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import WeatherPage from './pages/weather/WeatherPage';
import About from './pages/about/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './constants/Routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<WeatherPage />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
        </Route>
      </Routes>
      <ToastContainer aria-label={undefined} />
    </Router>
  );
}

export default App;