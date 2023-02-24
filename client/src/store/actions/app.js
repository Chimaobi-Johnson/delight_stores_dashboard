import { ADD_CURRENT_SIZE } from "./action-type"

export const addCurrentSize = (data) => async (dispatch) => {
    dispatch({
        type: ADD_CURRENT_SIZE,
        payload: data
    })
}