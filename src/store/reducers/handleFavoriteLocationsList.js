import { ADD_LOCATION, REMOVE_LOCATION } from "../../constants";

const initialState = [];


export default (state = initialState, action) => {

  switch (action.type) {

    case ADD_LOCATION:
      return [...state, action.payload];
    // case REMOVE_LOCATION:
    //     return [...state, action.payload];
    default:
      return state;
  }
};
