import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "@redux/WeatherSlice";
import { getCurrentWeather } from "@api/APIFunction";
import { WeatherData } from "@api/types/weather.type";
import { RootState } from "@redux/Store";
import Skeleton from "react-loading-skeleton";
import CurrentWeather from "./Current";
import SkeletonPage from "./Skeleton";
import { WeatherDetail } from "./Detail";
import { handleError } from "@utils/errorHandler";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

const CurrentAndDetail: React.FC = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const defaultCity = useSelector(
    (state: RootState) => state.weather.defaultCity
  );
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (!currentWeather || !currentWeather.name) {
      const fetchWeather = async () => {
        try {
          const response = await trackPromise(getCurrentWeather(defaultCity));
          const weatherData = response.data as WeatherData;
          dispatch(setWeatherData(weatherData));
        } catch (err) {
          handleError(err);
        }
      };

      fetchWeather();
    }
  }, [dispatch, currentWeather, defaultCity]);

  if (promiseInProgress) {
    return (
      <Skeleton />
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