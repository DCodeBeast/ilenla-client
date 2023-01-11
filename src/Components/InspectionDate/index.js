import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
export default function InspectionDate({ setBooking, booking }) {
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([]);
  const [time, setTime] = useState();

  const [portalTarget, setPortalTaget] = useState();

  useEffect(() => {
    let appt = [];
    if (booking.inspectionDays && values.length === 0) {
      console.log("days63646264", values, 1);

      return;
    } else {
      console.log("days63646264", values, booking.inspectionDays, 2);

      values.map((val) => appt.push(new Date(val)));
      console.log("appt", appt);

      setBooking({
        ...booking,
        inspectionDays: [...values],
        appointmentDays: [...appt],
      });
    }
    appt = [];
  }, [values]);

  useEffect(() => {
    if (booking.inspectionTime) {
      console.log("timegtthhh", time, 1);

      return;
    } else {
      console.log("timegtthhh", time, 2);

      setBooking({ ...booking, inspectionTime: time });
    }
  }, [time]);

  useEffect(() => {
    const portalDiv = document.createElement("div");

    /**
     * This ID is optional and has been added
     * to better recognize it in the DOM tree.
     */
    portalDiv.id = "myPortalDiv";

    document.body.appendChild(portalDiv);

    setPortalTaget(portalDiv);

    return () => document.body.removeChild(portalDiv);
  }, []);
  console.log(
    "val",
    values.map((val) => new Date(val))
  );
  console.log("time", time, time?.minute);
  return (
    <Grid xs={12} container justifyContent="space-between" pt={3} px={5}>
      <Grid item xs={5}>
        <Typography color="white" textAlign="left">
          Appointment Day(s) *
        </Typography>
        <DatePicker
          style={{
            width: "70%",
            boxSizing: "border-box",
            height: "50px",
          }}
          containerStyle={{
            width: "100%",
          }}
          multiple
          placeholder="Select Preferred Days"
          portal
          minDate={new Date()}
          maxDate={new Date().setDate(60)}
          portalTarget={portalTarget}
          plugins={[<DatePanel />]}
          value={
            booking.inspectionDays.length > 3 
              ? booking.inspectionDays.splice(3)
              : booking.inspectionDays
          }
          animations={[transition({ duration: 800, from: 35 })]}
          onChange={setValues}
        />
        <span style={{ color: "white", textAlign: "left" }}>
          Note:You can choose upto 3 days
        </span>
      </Grid>
      <Grid item xs={5} style={{ zIndex: "10000" }}>
        <Typography color="white" textAlign="left">
          Selected Time *
        </Typography>

        <DatePicker
          style={{
            width: "40%",
            boxSizing: "border-box",
            height: "50px",
          }}
          containerStyle={{
            width: "100%",
          }}
          value={booking.inspectionTime}
          onChange={setTime}
          disableDayPicker
          format="HH:mm"
          placeholder="Select Time"
          animations={[transition({ duration: 800, from: 35 })]}
          plugins={[<TimePicker hideSeconds />]}
        />
      </Grid>
      {/* {values?.map(val => <span>{val}</span>)} */}
    </Grid>
  );
}
