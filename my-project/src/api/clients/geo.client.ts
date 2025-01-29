import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { applyCommonInterceptors } from '../interceptors/common';
import { applyLoggingInterceptor } from '../interceptors/logging';
import { applyErrorInterceptor } from '../interceptors/error';

const geoClient = axios.create({
  baseURL: API_CONFIG.BASE_URLS.GEO,
});

applyCommonInterceptors(geoClient, {
  additionalParams: {
    limit: API_CONFIG.DEFAULT_PARAMS.LIMIT,
  },
});
applyLoggingInterceptor(geoClient);
applyErrorInterceptor(geoClient);

export { geoClient };