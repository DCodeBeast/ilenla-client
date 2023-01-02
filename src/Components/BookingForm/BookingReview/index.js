import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const BookingReview = ({ appointmentDays }) => {
  console.log("inspectionDays", appointmentDays);
  return (
    <Grid container px={2} spacing={2}>
      <Grid item sm={8}></Grid>
      <Grid item sm={4}>
        <Paper elevation={3}>
          <Grid>
            <Typography>Appointment Schedule</Typography>
            <Grid container p={2}>
              <Grid>
                {appointmentDays?.map((day) => (
                  <Grid>
                    {" "}
                    <span>
                      {JSON.parse(JSON.stringify(new Date(day))).split("T")[0]}
                    </span>
                  </Grid>
                ))}
              </Grid>
              <Grid></Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BookingReview;
