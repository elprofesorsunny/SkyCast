import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWeatherData } from "../redux/WeatherSlice";
import { WeatherService } from "../api/services/weather.service";
import { RootState } from "../redux/Store";

function WeatherCurrent() {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!weatherData) {
            const fetchDefaultCityWeather = async () => {
                try {
                    const defaultCity = "London";
                    const data = await WeatherService.searchCities(defaultCity);
                    if (data.length > 0) {
                        dispatch(setWeatherData(data[0]));
                    }
                } catch (error) {
                    console.error("Error fetching weather data: ", error);
                }
            };
            fetchDefaultCityWeather();
        }
    }, [weatherData, dispatch]);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex flex-row justify-between items-center gap-5">
            <div className="flex flex-col gap-2 justify-start">
                <h1 className="text-4xl font-bold text-[#212529]">{weatherData.name}</h1>
                <h4 className="text-xl text-[#6c757d]">Feels Like: {weatherData.main.feels_like}&deg;C</h4>
            </div>
            <aside className="flex flex-col items-center gap-4">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                    alt="weather icon"
                    className="w-[120px] h-[120px]"
                />
                <div className="text-4xl font-semibold text-[#212529]">{weatherData.main.temp}&deg;C</div>
                <div className="flex gap-6 text-[#495057]">
                    <div>High: {weatherData.main.temp_max}&deg;C</div>
                    <div>Low: {weatherData.main.temp_min}&deg;C</div>
                </div>
            </aside>
        </section>
    );
}

export default WeatherCurrent;
