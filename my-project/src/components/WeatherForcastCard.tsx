import { WeatherCardProps } from '@types/weatherCard.type';

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, temperature, high, low }) => {
    
    return (

        <div className="flex flex-col bg-[#e9ecef] rounded-2xl w-[200px] h-[300px] shadow-xl">
            <div className="flex justify-center text-xl font-semibold bg-[#dee2e6] p-4 rounded-tl-2xl rounded-tr-2xl">
                {title}
            </div>
            <div className="flex flex-col p-4 items-center gap-3">
                <img src={icon} alt={`${title} icon`} className="flex w-[100px] h-[100px] content-center" />
                <div className="font-semibold text-4xl">{temperature}&deg;C</div>
                <div className="flex flex-row gap-6 text-2xl">
                    <div>H: {high}&deg;C</div>
                    <div>L: {low}&deg;C</div>
                </div>
            </div>
        </div>

    );
};

export default WeatherCard;
