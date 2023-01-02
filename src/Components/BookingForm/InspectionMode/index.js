import { Grid } from "@mui/material";
import React from "react";
import InspectionCard from "../../InspectionCard";
import InspectionDate from "../../InspectionDate";

const inspectionData = [
  {
    mode: "physical",
  },
  {
    mode: "report",
  },
  {
    mode: "virtual",
  },
];

const InspectionMode = ({ setBooking, booking }) => {
  const [activeMode, setActiveMode] = React.useState();

  const handleInspectionMode = (mode) => {
    console.log("activeMode", 1, activeMode);
    setBooking({ ...booking, mode: mode });
  };
  return (
    <Grid container spacing={2}>
      {inspectionData.map((data, index) => (
        <InspectionCard
          mode={data.mode}
          index={index}
          handleInspectionMode={handleInspectionMode}
          activeMode={booking.mode}
        />
      ))}
      {booking.mode === "physical" || booking.mode === "virtual" ? (
        <InspectionDate booking={booking} setBooking={setBooking}/>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default InspectionMode;
