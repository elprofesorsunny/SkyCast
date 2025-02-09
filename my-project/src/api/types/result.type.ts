import { GeoData } from "@api/types/weather.type";

export interface SearchResultsProps {
  searchResults: GeoData[];
  dispatch: any;
}