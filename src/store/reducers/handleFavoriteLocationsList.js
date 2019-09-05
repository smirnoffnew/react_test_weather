import { ADD_LOCATION, REMOVE_LOCATION } from "../../constants";

const initialState = [];

export default (state = initialState, action) => {

  switch (action.type) {

    case ADD_LOCATION:
      return [...state, action.payload];

    case REMOVE_LOCATION:
      const index = state.findIndex(location => location && location.id === action.payload.id)
      return index !== -1 ? (state.splice(index, 1), [...state]) : state;

    default:
      return state;
  }
};
