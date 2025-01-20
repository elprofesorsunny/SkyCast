import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
    weatherData: any | null;
}

const initialState: WeatherState = {
    weatherData: JSON.parse(localStorage.getItem("weatherData") || "null"),
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherData: (state, action: PayloadAction<any>) => {
            state.weatherData = action.payload;
            localStorage.setItem("weatherData", JSON.stringify(action.payload));
        },
    },
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
