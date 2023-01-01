import React, { useContext } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid } from "@mui/material";

import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";
import { setFilter, ToggleContext } from "../../Contexts/ToggleContext";

const FilterList = () => {

  const {toggle, dispatch} = useContext(ToggleContext)

  const handleClick = () => {
    dispatch(setFilter(!toggle.isFilterOpen));
  };
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [propertyBarShow, setPropertyBarShow] = useState(true);

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    if(screenSize.dynamicWidth < 700 ) {
      setPropertyBarShow(false)
    } else {
      return
    }
    
  }, [screenSize])


  return (
    <>{propertyBarShow &&
    <Grid container sm={0.5} className="filterList">
      <Grid
        container
        item
        className={toggle.isFilterOpen ? "active" : "filterIcon"}
        onClick={() => handleClick()}
      >
        <FilterListIcon />
      </Grid>
    </Grid>}</>
  );
};

export default FilterList;
