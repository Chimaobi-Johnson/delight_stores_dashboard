import { ADD_CURRENT_SIZE } from "store/actions/action-type";

const initialState = {
  sizes: []
};

const appActions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_SIZE:
      return newState;
    default:
      return state;
  }
};

export default appActions;
