import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "../redux/WeatherSlice";
import { getCurrentWeather } from "../api/APIFunction";
import { WeatherData } from "../api/types/weather.type";
import { RootState } from "../redux/Store";

const WeatherCurrent = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state: RootState) => state.weather.weatherData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentWeather || !currentWeather.name) {
      const fetchWeather = async () => {
        try {
          setLoading(true);
          setError(null);
          const city = "London";
          const response = await getCurrentWeather(city);

          if (!response || !response.data) {
            throw new Error("Failed to fetch weather data");
          }

          const weatherData = response.data as WeatherData;
          dispatch(setWeatherData(weatherData));
        } catch (err) {
          setError("Error fetching weather data");
          console.error("Error fetching weather:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    } else {
      setLoading(false);
    }
  }, [dispatch, currentWeather]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!currentWeather?.weather?.length) return <div>Error: No weather data available</div>;

  return (
    <section className="flex flex-row justify-between items-center gap-5">
      <div className="flex flex-col gap-2 justify-start">
        <h1 className="text-4xl font-bold text-[#212529]">{currentWeather.name}</h1>
        <h4 className="text-xl text-[#6c757d]">
          Feels Like: {Math.round(currentWeather.main.feels_like - 273.15)}&deg;C
        </h4>
      </div>
      <aside className="flex flex-col items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@4x.png`}
          alt={currentWeather.weather[0]?.description || "Weather icon"}
          className="w-[120px] h-[120px]"
        />
        <div className="text-4xl font-semibold text-[#212529]">
          {Math.round(currentWeather.main.temp - 273.15)}&deg;C
        </div>
        <div className="flex gap-6 text-[#495057]">
          <div>High: {Math.round(currentWeather.main.temp_max - 273.15)}&deg;C</div>
          <div>Low: {Math.round(currentWeather.main.temp_min - 273.15)}&deg;C</div>
        </div>
      </aside>
    </section>
  );
};

export default WeatherCurrent;
