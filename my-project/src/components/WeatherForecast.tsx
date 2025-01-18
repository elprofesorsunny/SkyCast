import WeatherCard from "../components/WeatherForcastCard";

const WeatherForecast: React.FC = () => {
  const weatherData = [
    {
      title: "Tomorrow",
      icon: "../assets/icons/sunnyDay-icon.svg",
      temperature: 18,
      high: 6,
      low: -3,
    },
    {
      title: "Sunday",
      icon: "../assets/icons/sunnyDay-icon.svg",
      temperature: 15,
      high: 6,
      low: -4,
    },
    {
      title: "Monday",
      icon: "../assets/icons/sunnyDay-icon.svg",
      temperature: 16,
      high: 6,
      low: -3,
    },
  ];

  return (
    <div className="flex flex-row gap-5">
      {weatherData.map((data, index) => (
        <WeatherCard
          key={index}
          title={data.title}
          icon={data.icon}
          temperature={data.temperature}
          high={data.high}
          low={data.low}
        />
      ))}
    </div>
  );
};

export default WeatherForecast;
