import { Grid } from "@mui/material";
import React, { useState } from "react";
import BookingFlow from "./BookingFlow";

import "./styles.css";

const BookingForm = () => {
  return (
    <Grid container>
      <Grid container sm={12}>
        <BookingFlow />
      </Grid>
    </Grid>
  );
};

export default BookingForm;
