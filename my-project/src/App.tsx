import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import SearchAndCityList from './components/SearchAndCityList';
import Weather from './components/Weather';
import { setWeatherData } from './redux/WeatherSlice';
import { RootState } from './redux/Store';

function App() {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    const dispatch = useDispatch();

    return (
        <div className="bg-[#f8f9fa] w-screen h-screen">
            <Header />
            <Weather weatherData={weatherData} />
            <SearchAndCityList setWeatherData={(data: any) => dispatch(setWeatherData(data))} />
        </div>
    );
}

export default App;
