import { StateType } from "./Provider";

export const mainreducer = (state: StateType, action : any) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        locationData: {
          location: action.data?.location?.[0],
          regionAndCity: action.data?.region_and_city,
        },
      };

    default:
      return state;
  }
};
