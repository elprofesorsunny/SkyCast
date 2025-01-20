import axios from 'axios';
import ErrorHandler from './ErrorHandler';

const apiKey = 'ef827831237dbae7257b7b7499242373';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const WeatherAPI = {
    searchCity: async (query: string): Promise<any[]> => {
        const url = `${baseUrl}/find?q=${query}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            return response.data.list || [];
        } catch (error) {
            const errorMessage = ErrorHandler.handle(error);
            ErrorHandler.log(error);
            throw new Error(errorMessage);
        }
    },
};

export default WeatherAPI;
