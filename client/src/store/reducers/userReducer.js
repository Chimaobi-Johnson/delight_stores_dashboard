import { STORED_LOGGEDIN_USER } from "store/actions/action-type";

const initialState = {};
  
const userActions = (state = initialState, action) => {
    switch (action.type) {
      case STORED_LOGGEDIN_USER:
        return action.payload.data
      default:
        return state;
    }
  };
  
export default userActions;