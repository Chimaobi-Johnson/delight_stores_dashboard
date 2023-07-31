import { STORED_LOGGEDIN_USER } from "./action-type"



export const storeLoggedInUser = (data) => async (dispatch) => {
    dispatch({
        type: STORED_LOGGEDIN_USER,
        payload: {
            data
        }
    })
}