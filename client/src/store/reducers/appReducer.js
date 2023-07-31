import { ADD_CURRENT_SIZE } from "../actions/action-type";

const initialState = {
  sizes: []
};

const appActions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_SIZE:
      return state;
    default:
      return state;
  }
};

export default appActions;
