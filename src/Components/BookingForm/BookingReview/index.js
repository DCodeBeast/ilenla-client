import { Chip, Grid, Paper, Radio, Table, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import "./styles.css";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../../actions/booking";

const BookingReview = ({
  appointmentDays,
  inspectionTime,
  booking,
  setBooking,
}) => {
  // console.log("inspectionDays", Array.isArray(appointmentDays), appointmentDays);
  console.log("inspectionDays", inspectionTime?.hour);
  let { cart } = useSelector((state) => state.cart);
  const { cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = React.useState("onsite");

  const config = {
    reference: new Date().getTime().toString(),
    email: booking?.email,
    amount: Number(cartTotal * 100)?.toFixed(2),
    metadata: {
      amount_paid: Number(cartTotal)?.toFixed(2),
    },

    publicKey: "pk_test_cd5d1c48e331b8a865065248be6c5292f510e932",
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleClick = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    setBooking({
      ...booking,
      payment_method: selectedValue,
    });
  }, [selectedValue]);

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // setOrderData({ ...orderData, pay_stack_ref: reference?.reference });
    setBooking({
      ...booking,
      payment_status: "paid",
      paystack_details: [{ ...config }],
    });
    dispatch(createBooking({...booking,paystack_details: [{ ...config }], amount_paid:cartTotal}));
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log('closed')
  };

  const componentProps = {
    ...config,
    text: <span>Pay {cartTotal.toFixed(0)} NGN to Proceed</span>,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  console.log("fuwefujrj", booking, cart.length);
  return (
    <Grid container px={2} spacing={2}>
      <Grid item sm={8}>
        <Paper elevation={3}>
          <Grid>
            <Typography>Appointment Details</Typography>
            <Table className="booking-details">
              <thead style={{ borderTop: "2px solid #adb5bd" }}>
                <th>
                  {" "}
                  <span>S/N</span>
                </th>
                <th>
                  <span>Description</span>
                </th>
                <th>
                  <span>Avg. Fee (NGN)</span>
                </th>
              </thead>
              <tbody>
                {cart?.map((cartItem, index) => (
                  <tr
                    style={{
                      background: "#80808033",
                      borderBottom: "2px solid white",
                    }}
                  >
                    <td>
                      <span>{index + 1}</span>
                    </td>
                    <td>
                      <Grid py={2} px={2}>
                        <span>{cartItem.rooms}</span>&nbsp;
                        <span>{cartItem.type}</span>&nbsp;
                        <span style={{ color: "gray" }}>@</span>&nbsp;
                        <span>{cartItem.address}</span>&nbsp;
                        <span style={{ color: "gray", fontStyle: "italic" }}>
                          for
                        </span>
                        &nbsp;
                        <span> {cartItem.listing}</span>&nbsp;
                      </Grid>
                    </td>
                    <td>
                      <span>{(cartTotal / cart?.length).toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Grid>
          <Grid container justifyContent="right" pr={1}>
            <span style={{ color: "gray" }}>
              It will cost you{" "}
              <p
                style={{
                  color: "green",
                  fontSize: "20px",
                  display: "inline-block",
                  background: "rgba(59, 208, 216, 0.9)",
                  padding: "10px",
                }}
              >
                {cartTotal.toFixed(2)} NGN
              </p>{" "}
              to inspect all this properties
            </span>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={4}>
        <Grid>
          <Paper elevation={3}>
            <Grid>
              <Typography>Appointment Time Info</Typography>
              <Grid container p={2}>
                <Grid xs={12}>
                  {appointmentDays?.map((day) => (
                    <Grid
                      container
                      xs={12}
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                    >
                      {" "}
                      <span>
                        <AccessTimeFilledIcon />
                        &nbsp;
                        {
                          JSON.parse(JSON.stringify(new Date(day))).split(
                            "T"
                          )[0]
                        }
                      </span>
                      <span>
                        {inspectionTime?.hour ? (
                          `${inspectionTime?.hour} : ${inspectionTime?.minute}` || (
                            <>No Time Specified yet</>
                          )
                        ) : (
                          <>yet to pick a time</>
                        )}
                      </span>
                    </Grid>
                  ))}
                </Grid>
                <Grid></Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid pt={3}>
          <Paper elevation={3} style={{ background: "rgba(59,208,216,.9)" }}>
            <Grid>
              <Typography>Choose Payment Method</Typography>
              <span
                style={{
                  display: "block",
                  width: "100%",
                  background: "#ffff006b",
                  padding: "4px",
                }}
              >
                Payment Status &nbsp;: &nbsp;
                <Chip label={booking.payment_status} size="small" />{" "}
              </span>
              <Grid container justifyContent={"space-between"} p={2}>
                <Grid
                  item
                  xs={5}
                  className={`${
                    selectedValue === "onsite"
                      ? "bookingPaymentSelected bookingPaymentOption"
                      : "bookingPaymentOption"
                  }`}
                  onClick={() => handleClick("onsite")}
                >
                  <Radio
                    checked={selectedValue === "onsite"}
                    onChange={handleChange}
                    value="onsite"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />{" "}
                  <span>On Site</span>
                </Grid>
                <Grid
                  item
                  xs={5}
                  onClick={() => handleClick("paystack")}
                  className={`${
                    selectedValue === "paystack"
                      ? "bookingPaymentSelected bookingPaymentOption"
                      : "bookingPaymentOption"
                  }`}
                >
                  <Radio
                    checked={selectedValue === "paystack"}
                    onChange={handleChange}
                    value="paystack"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <span>PayStack</span>
                </Grid>
              </Grid>
              {selectedValue === "paystack" && (
                <Grid>
                  <PaystackButton
                    className="paystack-checkout"
                    {...componentProps}
                  />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingReview;
