import React, { createContext, useReducer, useContext } from "react";

export const PropertyContext = createContext();

// Initial state
const initialItems = [
  "Extract Property state to menu context",
  "Implement menu provider",
];

// Actions
export const SHOW_MENU = "SHOW_MENU";
export const HIDE_MENU = "HIDE_MENU";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function showProperty(e) {
  e.preventDefault();
  return { type: SHOW_MENU };
}

export function hideProperty(index) {
  return { type: HIDE_MENU };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function propertyReducer(state = { settingsProperty: false }, action) {
  switch (action.type) {
    case SHOW_MENU:
      return { ...state, settingsProperty: true };
    case HIDE_MENU:
      return { ...state, settingsProperty: false };

    case CLEAR_ALL:
      return [];
    default:
      return state;
  }
}

function PropertyProvider(props) {
  const [items, dispatch] = useReducer(propertyReducer, initialItems);

  const menuData = { items, dispatch };

  return <PropertyContext.Provider value={menuData} {...props} />;
}

function usePropertyContext() {
  return useContext(PropertyContext);
}

export { PropertyProvider, usePropertyContext };


// const initialFilterState = {
//   sortAscending: "",
//   sortBy: "",
//   location: "",
//   type: "",
//   listing: "",
//   rooms: "",
//   status: "",
//   price: "",
//   sale: "",
//   currency: "",
//   min: "",
//   max: "",
// };