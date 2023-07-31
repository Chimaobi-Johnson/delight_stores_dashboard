import { STORED_LOGGEDIN_USER } from "../actions/action-type";

const initialState = {};
  
const userActions = (state = initialState, action) => {
    switch (action.type) {
      case STORED_LOGGEDIN_USER:
        if(action.payload.data) {
          return action.payload.data
        }
        return state
      default:
        return state;
    }
  };
  
export default userActions;