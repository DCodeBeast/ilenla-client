import React, { useContext } from "react";
import { Grid } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";
import { setFilter, ToggleContext } from "../../Contexts/ToggleContext";

const ResponsiveFilter = ({setIsSortListOpen}) => {
  
  const [activeFilter, setActiveFilter] = useState()
  const { dispatch} = useContext(ToggleContext)

  const handleClick = (val) => {
 
    dispatch(setFilter(true))
    setActiveFilter(val)
  }
  const handleSortByClick = (val) => {
    setIsSortListOpen(true)
    setActiveFilter(val)
  }
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
    <>{!propertyBarShow &&
    <Grid container justifyContent='space-between' xs={12} mt={2} className="responsiveFilter">
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        xs={5.9}
        py={1}
        item
        className={activeFilter === 0 ? "active" : "filterListIcon"}
        onClick={() =>handleClick(0)}
      >
      
        <FilterListIcon />
        Filters
     
      </Grid>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        xs={5.9}
        py={1}
        item
        className={activeFilter === 1 ? "active" : "swapIcon"}
        onClick={() =>handleSortByClick(1)}

      >
        <SwapVertIcon />
        Sort By 
      </Grid>
    </Grid>} </>
  );
};

export default ResponsiveFilter;
