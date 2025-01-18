interface City {
    name: string;
    temperature: number;
    icon: string;
}

interface CityListProps {
    cities: City[];
}

function CityList({ cities }: CityListProps) {
    return (
        <div className="flex flex-col gap-5">
            {cities.map((city, index) => (
                <div key={index} className="flex bg-gradient-to-r from-[#dee2e6] from-50% to-50% to-[#f8f9fa] rounded-2xl shadow-xl w-[300px] h-[100px]">
                    <div className="flex bg-[#f8f9fa] p-4 rounded-2xl items-center text-2xl font-semibold">
                        {city.temperature}°C
                    </div>
                    <div className="flex bg-[#dee2e6] p-4 items-center text-2xl font-semibold rounded-tr-2xl rounded-br-2xl">
                        {city.name}
                    </div>
                    <img src={city.icon} className="flex content-center fill-black bg-[#f8f9fa] flex-grow rounded-tr-2xl rounded-br-2xl justify-center items-center" alt="weather-icon" />
                </div>
            ))}
        </div>
    );

}

export default CityList;
