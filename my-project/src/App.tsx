import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Weather from './components/Weather';
import SearchAndCityList from './components/SearchAndCityList';
import { RootState } from './redux/Store';
import { setWeatherData } from './redux/WeatherSlice';

function App() {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    const dispatch = useDispatch();

    return (
        <Router>
            <div className="bg-[#f8f9fa] w-screen h-screen">
                <Header />
                <Weather weatherData={weatherData} />
                <SearchAndCityList setWeatherData={(data: any) => dispatch(setWeatherData(data))} />
            </div>
        </Router>
    );
}

export default App;
