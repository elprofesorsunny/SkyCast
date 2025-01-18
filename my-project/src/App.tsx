import './App.css'
import { useState } from 'react';
import Header from './components/Header'
import SearchAndCityList from './components/SearchAndCityList'
import Weather from './components/Weather'

function App() {

    const [weatherData, setWeatherData] = useState(null);

    return (

        <div className='bg-[#f8f9fa] w-screen h-screen'>
            <Header/>
            <Weather weatherData={weatherData} />
            <SearchAndCityList setWeatherData={setWeatherData} />
        </div>
    )
}

export default App
