import React, { createContext, useReducer, useContext } from "react";

export const SearchContext = createContext();

// Initial state
const initialItems = {
  status: "",
  price: "",
  sale: "",
  location: "",
  type: "",
  listing: "",
  rooms: "",
  min:'',
  max:'',
  currency:'NGN',
  show: false,
  showOptions:[]
};

// Actions
export const SET_STATUS = "SET_STATUS";
export const SET_PRICE = "SET_PRICE";
export const SET_SALE = "SET_SALE";
export const SET_LOCATION = "SET_LOCATION";
export const SET_TYPE = "SET_TYPE";
export const SET_LISTING = "SET_LISTING";
export const SET_ROOMS = "SET_ROOMS";
export const POST_CHIP_DATA = "POST_CHIP_DATA";
export const POST_SORT_DATA = "POST_SORT_DATA";
export const SET_SHOW_OPTIONS = "SET_SHOW_OPTIONS";
export const SET_MIN = "SET_MIN";
export const SET_MAX = "SET_MAX";
export const SET_CURRENCY = "SET_CURRENCY";
// setLocation, setType, setListing, setRooms

// Action creators
export function setStatus(val) {
  console.log("dispatchEVent", val);
  return { type: SET_STATUS, payload: val };
}
// Action creators
export function setPrice(val) {
  return { type: SET_PRICE, payload: val };
}
// Action creators
export function setSale(val) {
  return { type: SET_SALE, payload: val };
}
// Action creators
export function setLocation(val) {
  return { type: SET_LOCATION, payload: val };
}
// Action creators
export function setType(val) {
  console.log("creator", val);
  return { type: SET_TYPE, payload: val };
}
// Action creators
export function setListing(val) {
  console.log("creator", val);
  return { type: SET_LISTING, payload: val };
}
// Action creators
export function setRooms(val) {
  console.log("creator", val);
  return { type: SET_ROOMS, payload: val };
}
// Action creators
export function setShowOptions(val) {
  console.log("creator", val);
  return { type: SET_SHOW_OPTIONS, payload: val };
}
// Action creators
export function setMin(val) {
  console.log("creator", val);
  return { type: SET_MIN, payload: val };
}
// Action creators
export function setMax(val) {
  console.log("creator", val);
  return { type: SET_MAX, payload: val };
}
// Action creators
export function setCurrency(val) {
  console.log("creator", val);
  return { type: SET_CURRENCY, payload: val };
}

// Reducer
export function searchReducer(
  state = {
    status: "",
    price: "",
    sale: "",
    location: "",
    type: "",
    listing: "",
    rooms: "",
    chipData: "",
    sortData: "",
    showOptions: false,
    min:'',
    max:'',
    currency:''
  },
  action
) {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.payload };
    case SET_PRICE:
      return { ...state, price: action.payload };
    case SET_SALE:
      return { ...state, sale: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_TYPE:
      return { ...state, type: action.payload };
    case SET_LISTING:
      return { ...state, listing: action.payload };

    case SET_ROOMS:
      return { ...state, rooms: action.payload };

    case SET_SHOW_OPTIONS:
      
      return { ...state, showOptions: action.payload };
    case SET_MIN:
      
      return { ...state, min: action.payload };
    case SET_MAX:
      
      return { ...state, max: action.payload };
    case SET_CURRENCY:
      
      return { ...state, currency: action.payload };
    case POST_CHIP_DATA:
      localStorage.setItem("chipData", JSON.stringify(...action?.payload));
      console.log(action?.payload);
      return { ...state, chipData: action?.payload };

    case POST_SORT_DATA:
      localStorage.setItem("sortData", JSON.stringify(...action?.payload));
      console.log("sortData", action?.payload);
      return { ...state, sortData: action?.payload };

    default:
      return state;
  }
}

function SearchProvider(props) {
  const [search, dispatch] = useReducer(searchReducer, initialItems);
  const menuData = { search, dispatch };
  return <SearchContext.Provider value={menuData} {...props} />;
}

function useSearchContext() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearchContext };
