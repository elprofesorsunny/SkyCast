import React from "react";
import WeatherCurrent from "./components/WeatherCurrent";
import SearchAndResult from "./components/SearchAndResult";

const WeatherPage: React.FC = () => {
  return (
    <main className="flex w-full h-screen items-end justify-start p-10 gap-5">
      <div className="flex flex-col bg-[#e9ecef] shadow-lg h-[600px] w-[500px] bottom-10 left-10 rounded-2xl p-5 text-black gap-5">
        {/* General Information */}
        <WeatherCurrent />
        {/* Search and Results */}
        <SearchAndResult />
      </div>
    </main>
  );
};

export default WeatherPage;