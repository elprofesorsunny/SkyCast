import WeatherCurrent from './WeatherCurrent';
import WeatherDetail from './WeatherDetail';
import WeatherForecast from './WeatherForecast';


interface WeatherProps {
    weatherData: {
        name: string;
        main: {
            temp: number;
            feels_like: number;
            temp_max: number;
            temp_min: number;
        };
        weather: {
            icon: string;
        }[];
    } | null;
}

function Weather({ weatherData }: WeatherProps) {
    return (
        <main className="flex w-full h-screen items-end justify-start p-10 gap-5">
            <main className="flex flex-col bg-[#e9ecef] shadow-lg h-[600px] w-[500px] bottom-10 left-10 rounded-2xl p-5 text-black gap-5">

                {/* General Information */}
                <WeatherCurrent weatherData={weatherData} />

                {/* Detail Information */}
                <WeatherDetail />

            </main>
            <main>

                {/* Weather Forecast Information */}
                <WeatherForecast />

            </main>
        </main>
    );
}

export default Weather;
