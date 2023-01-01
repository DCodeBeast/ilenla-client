import React, { createContext, useReducer, useContext } from "react";

export const SortContext = createContext();

// Initial state
const initialItems = {
  sortBy: "PRICE",
  sortAscending: true,
};

// Actions
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_ASCENDING = "SET_ASCENDING";


// Action creators
export function setSortBy(val) {
  return { type: SET_SORT_BY, payload: val };
}
// Action creators
export function setSortAscending(val) {
  // console.log('creator', val)
  return { type: SET_ASCENDING, payload: val };
}

// Reducer
export function sortReducer(
  state = { sortBy: '', setAscending: '' },
  action
) {
  switch (action.type) {
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };

    case SET_ASCENDING:
      return { ...state, sortAscending: action.payload };

    default:
      return state;
  }
}

function SortProvider(props) {
  const [sort, dispatch] = useReducer(sortReducer, initialItems);

  const menuData = { sort, dispatch };

  return <SortContext.Provider value={menuData} {...props} />;
}

function useSortContext() {
  return useContext(SortContext);
}

export { SortProvider, useSortContext };

