import { TOGGLE_TEMPERATURE_TYPE } from "../../constants";

const isTemperatureInF = true;

export default (state = isTemperatureInF, action) => {

  switch (action.type) {

    case TOGGLE_TEMPERATURE_TYPE:
      return !state;

    default:
      return state;
  }
};
