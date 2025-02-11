import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import WeatherPage from './pages/weather/WeatherPage';
import About from './pages/about/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './constants/Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/Store';
import { Provider } from 'react-redux';
import store from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Layout />}>
              <Route index element={<WeatherPage />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
            </Route>
          </Routes>
          <ToastContainer aria-label={undefined} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;