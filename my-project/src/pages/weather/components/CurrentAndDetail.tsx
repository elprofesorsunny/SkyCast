import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "@redux/WeatherSlice";
import { getCurrentWeather } from "@api/APIFunction";
import { WeatherData } from "@api/types/weather.type";
import { RootState } from "@redux/Store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CurrentWeather from "@components/Current";
import { WeatherDetail } from "@components/Detail";
import { handleError } from "@utils/errorHandler";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

const CurrentAndDetail: React.FC = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (!currentWeather || !currentWeather.name) {
      const fetchWeather = async () => {
        try {
          const city = "London";
          const response = await trackPromise(getCurrentWeather(city));
          const weatherData = response.data as WeatherData;
          dispatch(setWeatherData(weatherData));
        } catch (err) {
          handleError(err);
        }
      };

      fetchWeather();
    }
  }, [dispatch, currentWeather]);

  if (promiseInProgress) {
    return (
      <section className="flex flex-row justify-between items-center gap-5">
        <div className="flex flex-col gap-2 justify-start">
          <Skeleton height={40} width={200} />
          <Skeleton height={20} width={150} />
        </div>
        <aside className="flex flex-col items-center gap-4">
          <Skeleton circle={true} height={120} width={120} />
          <Skeleton height={40} width={100} />
          <div className="flex gap-6">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
          </div>
        </aside>
      </section>
    );
  }

  return (
    <div>
      <CurrentWeather currentWeather={currentWeather} />
      <WeatherDetail />
    </div>
  );
};

export default React.memo(CurrentAndDetail);
