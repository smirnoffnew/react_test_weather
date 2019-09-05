import { combineReducers } from "redux";
import handleFavoriteLocationsList from "./handleFavoriteLocationsList";
import handleTemperatureType from './handleTemperatureType';

export default combineReducers({

    favoriteLocationsList: handleFavoriteLocationsList,
    isTemperatureInF: handleTemperatureType
});
