import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeals } from "../../actions/deals";
import PropertiesComponent from "../../Components/Properties";

const Properties = () => {

  const state = useSelector(state => state.deals)

  console.log('new', state)
  return (
    <Grid pt={5}>
      <PropertiesComponent />
    </Grid>
  );
};

export default Properties;
