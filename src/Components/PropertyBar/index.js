import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { GridContext, useGridContext } from "../../Contexts/GridContext";
import FilterList from "../FilterList";
import GridSetting from "../GridSetting";
import ResponsiveFilter from "../ResponsiveFilter";
import Search from "../Search";
import SortList from "../SortList";
import "./styles.css";

const PropertyBar = () => {
  const { items } = useContext(GridContext);

  console.log("ctx", items);

  const location = useLocation();

  console.log("loc", location);

  return (
    <div
      className="propertyBar"

    >
      <Grid container justifyContent="space-between">
        <FilterList />
        <Search />
        <SortList />
        <GridSetting />
      </Grid>
      <ResponsiveFilter />
    </div>
  );
};

export default PropertyBar;
