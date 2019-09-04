import { combineReducers } from "redux";
import handleFavoriteLocationsList from "./handleFavoriteLocationsList";


export default combineReducers({

    favoriteLocationsList: handleFavoriteLocationsList,
});
