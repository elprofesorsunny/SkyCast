import React from 'react';
import { CurrentWeatherProps } from "@types/currentWeather";


const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentWeather }) => {
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

export default CurrentWeather;