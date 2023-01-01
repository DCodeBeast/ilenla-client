import React, { createContext, useReducer, useContext } from "react";

export const ToggleContext = createContext();

// Initial state
const initialItems = {
  isFilterOpen:true,
  isSortListOpen:false
};

// Actions
export const SET_FILTER = "SET_FILTER";
export const SET_SORT_LIST = "SET_SORT_LIST";


// Action creators
export function setFilter(val) {
 
  return { type:SET_FILTER, payload:val};
}
// Action creators
export function setSortList(val) {
 
  return { type:SET_SORT_LIST, payload:val};
}



// Reducer
export function toggleReducer(state = {  isFilterOpen: true, isSortListOpen:false }, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state,  isFilterOpen: action.payload };
  
    case SET_SORT_LIST:
      return { ...state,  isSortListOpen: action.payload };
  
    default:
      return state;
  }
}

function ToggleProvider(props) {
  const [toggle, dispatch] = useReducer(toggleReducer, initialItems);

  const menuData = { toggle, dispatch };

  return <ToggleContext.Provider value={menuData} {...props} />;
}

function useToggleContext() {
  return useContext(ToggleContext);
}

export { ToggleProvider, useToggleContext };


// sortBy={sortBy}
// setSortBy={setSortBy}
// sortAscending={sortAscending}
// setSortAscending={setSortAscending}