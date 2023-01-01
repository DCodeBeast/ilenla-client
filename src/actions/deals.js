import { FETCH_ALL,COMMENT,FETCH_POST,START_LOADING,END_LOADING,FETCH_BY_SEARCH, DELETE, UPDATE, LIKE, CREATE } from "../constants/actionTypes";
import * as api from "../api";
// import {toast} from "react-toastify"

export const getAllDeals = (page) => async (dispatch) => {
  try {
 //   console.log(page)
    dispatch({type:START_LOADING})
    const { data } = await api.fetchAllDeals(page);
    console.log('server',data)
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:END_LOADING})


  } catch (error) {
    console.log(error);
  }
};

export const createDeal = (deal) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.createDeal(deal);

    console.log(data)
    dispatch({ type: CREATE, payload: data });
    dispatch({type:END_LOADING})
    // data && dispatch( toast.success(<>Success!!! Property is now listed</>))
        // data.error && dispatch( toast.error(<>{data.message}</>))
  } catch (error) {
    console.log(error);
  }
};
export const deleteDeal = (id) => async (dispatch) => {
  try {
    await api.deleteDeal(id);
    
    dispatch({ type: DELETE, payload: id });
    window.location.reload(false)
  } catch (error) {
    console.log(error);
  }
};