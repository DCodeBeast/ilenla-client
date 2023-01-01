import React, { useContext, useEffect, useState } from "react";
import WindowIcon from "@mui/icons-material/Window";
import GridOnIcon from "@mui/icons-material/GridOn";
import { Grid } from "@mui/material";
import { GridContext, setGrid } from "../../Contexts/GridContext";

import "./styles.css";

const GridSetting = () => {
  const { items, dispatch } = useContext(GridContext);

  console.log("ctx", items);
  const handleClick = (val) => {
    dispatch(setGrid(val));
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
    if (screenSize.dynamicWidth < 765) {
      setPropertyBarShow(false);
    } else {
      return;
    }
  }, [screenSize]);

  return (
    <>
      {propertyBarShow && (
        <Grid container sm={1} className="gridSetting">
          <Grid
            container
            sm={6}
            item
            className={items?.activeGrid === 0 ? "active" : "windowIcon"}
            onClick={() => handleClick(0)}
          >
            <WindowIcon />
          </Grid>
          <Grid
            container
            sm={6}
            item
            className={items?.activeGrid === 1 ? "active" : "gridIcon"}
            onClick={() => handleClick(1)}
          >
            <GridOnIcon />
          </Grid>
        </Grid>
      )}{" "}
    </>
  );
};

export default GridSetting;
