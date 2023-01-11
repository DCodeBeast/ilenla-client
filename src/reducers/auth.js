import { AUTH, LOG_OUT,START_LOADING,END_LOADING, SIGN_IN  } from "../constants/actionTypes";

const authReducer = (state = { auth: null, isLoading:false }, action) => {
  switch (action.type) {
   
    case SIGN_IN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      console.log(action?.data);
      return { ...state, auth: action?.data };
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
    case LOG_OUT:
      localStorage.clear();
      return { ...state, auth: null };
    default:
      return state;
  }
};

export default authReducer;
