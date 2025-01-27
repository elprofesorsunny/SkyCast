import WeatherCurrent from './WeatherCurrent';
import WeatherDetail from './WeatherDetail';
import WeatherForecast from './WeatherForecast';

function Weather() {
    return (
        <main className="flex w-full h-screen items-end justify-start p-10 gap-5">
            <main className="flex flex-col bg-[#e9ecef] shadow-lg h-[600px] w-[500px] bottom-10 left-10 rounded-2xl p-5 text-black gap-5">

                {/* General Information */}
                <WeatherCurrent />

                {/* Detail Information */}
                <WeatherDetail />

            </main>
            <main>

                {/* Weather Forecast Information */}
                {/* <WeatherForecast /> */}

            </main>
        </main>
    );
}

export default Weather;
