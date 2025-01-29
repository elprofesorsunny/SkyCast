import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { applyCommonInterceptors } from '../interceptors/common';
import { applyLoggingInterceptor } from '../interceptors/logging';
import { applyErrorInterceptor } from '../interceptors/error';

const weatherClient = axios.create({
  baseURL: API_CONFIG.BASE_URLS.WEATHER,
});

applyCommonInterceptors(weatherClient);
applyLoggingInterceptor(weatherClient);
applyErrorInterceptor(weatherClient);

export { weatherClient };