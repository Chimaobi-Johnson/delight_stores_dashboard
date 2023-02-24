import { ADD_CURRENT_SIZE } from "store/actions/action-type";

const initialState = {
  size: {
    name: "",
    price: null,
    availability: "",
  },
};

const appActions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_SIZE:
      const newState = {
        ...state,
        size: {
          ...state.size,
          ...action.payload,
        },
      };
      return newState;
    default:
      return state;
  }
};

export default appActions;
