import { POST_CHIP_DATA, POST_SORT_DATA} from "../constants/actionTypes";

const chipReducer = (state = { chipData: null, sortData:null }, action) => {
  switch (action.type) {
    case POST_CHIP_DATA:
      localStorage.setItem("chipData", JSON.stringify( ...action?.payload));
      console.log(action?.payload);
      return { ...state, chipData: action?.payload };
  
    case POST_SORT_DATA:
      localStorage.setItem("sortData", JSON.stringify( ...action?.payload));
      console.log("sortData",action?.payload);
      return { ...state, sortData: action?.payload };
  
    default:
      return state;
  }
};

export default chipReducer;
