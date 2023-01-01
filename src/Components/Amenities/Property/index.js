import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React from "react";
import "./styles.css";

const PropertyAmenities = ({ amenities }) => {
  return (
    <Grid container>
      {amenities.map((item) => (
        <Grid sm={4}>
          <FormControlLabel
            control={<Checkbox checked />}
            label={item}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyAmenities;
