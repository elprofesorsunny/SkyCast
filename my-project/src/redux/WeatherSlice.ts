import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
    weatherData: any | null;
    defaultCity: string;
    searchTerm: string;
    searchResults: any[];
}

const initialState: WeatherState = {
    weatherData: JSON.parse(localStorage.getItem("weatherData") || "null"),
    defaultCity: "London", // Default City
    searchTerm: "",
    searchResults: [],
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherData: (state, action: PayloadAction<any>) => {
            console.log("Redux Updated:", action.payload);
            state.weatherData = action.payload;
            // localStorage.setItem("weatherData", JSON.stringify(action.payload));
        },
        setDefaultCity: (state, action: PayloadAction<string>) => {
            state.defaultCity = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<any[]>) => {
            state.searchResults = action.payload;
        },
    },
});

export const { setWeatherData, setDefaultCity, setSearchTerm, setSearchResults } = weatherSlice.actions;

export default weatherSlice.reducer;