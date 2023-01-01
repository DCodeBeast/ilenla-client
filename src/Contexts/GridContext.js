import React, { createContext, useReducer, useContext } from "react";

export const GridContext = createContext();

// Initial state
const initialItems = {
 activeGrid:0

};

// Actions
export const SET_GRID = " SET_GRID";


// Action creators
export function setGrid(val) {
 
  return { type: SET_GRID, payload:val};
}



// Reducer
export function gridReducer(state = { activeGrid: 0 }, action) {
  switch (action.type) {
    case SET_GRID:
      return { ...state, activeGrid: action.payload };
  
    default:
      return state;
  }
}

function GridProvider(props) {
  const [items, dispatch] = useReducer(gridReducer, initialItems);

  const menuData = { items, dispatch };

  return <GridContext.Provider value={menuData} {...props} />;
}

function useGridContext() {
  return useContext(GridContext);
}

export { GridProvider, useGridContext };


// const [isFilterOpen, setIsFilterOpen] = useState(true);
// const [isSortListOpen, setIsSortListOpen] = useState(false);