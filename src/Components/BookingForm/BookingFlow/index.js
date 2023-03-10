import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Box, Button, Grid, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ADD_TO_CART } from "../../../constants/actionTypes";
import BookedProperty from "../../BookedProperty";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FastForwardIcon from "@mui/icons-material/FastForward";
import InspectionMode from "../InspectionMode";
import { PaystackButton } from "react-paystack";
import BookingReview from "../BookingReview";

import "./styles.css";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#1976d287",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "#1976d287",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: "#1976d287",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    //
    background: "#1976d287",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Booked Property(s)",
  "Choose Inspection Mode",
  "Review Your Appointment ",
  "Create an ad",
];

export default function BookingFlow() {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("profile"));

  let { cart } = useSelector((state) => state.cart);
  const { cartTotal } = useSelector((state) => state.cart);
  const [values, setValues] = useState([]);

  const [booking, setBooking] = useState({
    properties: [],
    mode: "",
    inspectionDays: [],
    inspectionTime: "",
    email: user?.user?.email,
    userId: "",
    userPhone: "",
    userAddress: "",
    amount_paid: null,
    pay_stack_ref: "",
    amount_due: null,
    payment_method: null,
    payment_status: "pending",
    paystack_details:[],
    appointmentDays: [],
  });

  const config = {
    reference: new Date().getTime().toString(),
    email: booking?.email,
    amount: Number(booking?.cartTotal * 100)?.toFixed(2),
    metadata: {
      amount_paid: Number(booking?.cartTotal)?.toFixed(2),
    },

    publicKey: "pk_test_cd5d1c48e331b8a865065248be6c5292f510e932",
  };


  useEffect(() => {
    dispatch({ type: ADD_TO_CART });
  }, []);
  useEffect(() => {
    setBooking({ ...booking, properties: [...cart] });
  }, [cart]);
  useEffect(() => {
    setBooking({ ...booking, amount_due:cartTotal });
  }, [cartTotal]);
  useEffect(() => {
    setBooking({ ...booking, email: user?.user?.email });
  }, [user?.user?.email]);

  console.log("booking", booking);
  console.log(
    "bookingVal",
    booking.inspectionDays.map((val) => new Date(val))
  );

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  console.log("book", cart);
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 2) {
      setValues([...booking.inspectionDays]);
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // const handlePaystackSuccessAction = (reference) => {
  //   // Implementation for whatever you want to do with reference and after success call.
  //   // setOrderData({ ...orderData, pay_stack_ref: reference?.reference });
  // };

  // you can call this function anything
  // const handlePaystackCloseAction = () => {
  //   // implementation for  whatever you want to do when the Paystack dialog closed.
  //   // console.log('closed')
  // };

  // const componentProps = {
  //   ...config,
  //   text: "Proceed To Checkout",
  //   onSuccess: (reference) => handlePaystackSuccessAction(reference),
  //   onClose: handlePaystackCloseAction,
  // };

  console.log("dhhhhf", booking);
  return (
    <Box sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        style={{
          position: "sticky",
          top: "0",
          zIndex: "100",
          background: "#1976d287",
          // background: "#1976d2",
          padding: "20px 0px",
          width: "100%",
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {label}
              <br />
              {index === 0 && (
                <span style={{ color: "red" }}>
                  {cart?.length} property(s) selected
                </span>
              )}
              {index === 1 && (
                <span style={{ color: "red", textTransform: "Capitalize" }}>
                  {booking.mode} Mode Selected
                </span>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ width: "100%" }}>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <Grid>
            <Grid className="bookingBody" style={{ position: "relative" }}>
              {activeStep === 0 && (
                <Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className="bookingTitle"
                    px={2}
                  >
                    <Grid>Bookings ({cart?.length})</Grid>

                    <Grid>
                      <Button
                        variant="contained"
                        endIcon={<ControlPointIcon />}
                        size="small"
                        as="a"
                        href="/properties"
                        className="back-btn"
                      >
                        Add More
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <Grid className="bookingTitle">
                    Bookings ({cart?.length})
                  </Grid> */}

                  <Grid className="bookingContentArea" py={5} px={2}>
                    <BookedProperty />
                  </Grid>
                </Grid>
              )}
              {activeStep === 1 && (
                <Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className="bookingTitle"
                    px={2}
                  >
                    <Grid>Choose Inspection Mode</Grid>

                    <Grid>
                      <Button
                        variant="contained"
                        endIcon={<ReplyAllIcon />}
                        size="small"
                        as="a"
                        href="/properties"
                        className="back-btn"
                      >
                        Back To Properties
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid className="bookingContentArea" py={5}>
                    <InspectionMode
                      setBooking={setBooking}
                      booking={booking}
                      values={values}
                      setValues={setValues}
                    />
                    {/* <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      inline
                    /> */}
                    <Grid
                      className="whatsapp_float_container"
                      container
                      md={6}
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Grid xs={10}>
                        <span>
                          Engage the Super Agent before choosing inspection date
                        </span>
                        <FastForwardIcon />
                      </Grid>
                      &nbsp;
                      <a
                        href="https://wa.me/2348100000000"
                        class="whatsapp_float"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="whatsapp-icon" />
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {activeStep === 2 && (
                <Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className="bookingTitle"
                    px={2}
                  >
                    <Grid>Review Your Appointment</Grid>

                    <Grid>
                      <Button
                        variant="contained"
                        endIcon={<ReplyAllIcon />}
                        size="small"
                        as="a"
                        href="/properties"
                        className="back-btn"
                      >
                        Back To Properties
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid className="bookingContentArea" py={5}>
                    <BookingReview
                     
                    
                      appointmentDays={booking.inspectionDays}
                      inspectionTime={booking.inspectionTime}
                      booking={booking}
                      setBooking={setBooking}
                    />
                    {/* <PaystackButton
                      className="cart-checkout"
                      {...componentProps}
                    /> */}
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Box
              sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              style={{
                position: "fixed",
                bottom: "0",
                zIndex: "100",
                background: "white",
                padding: "20px 0px",
                width: "100%",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="backBtn"
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                className="nextBtn"
                onClick={handleNext}
                sx={{ mr: 1 }}
                disabled={
                  (activeStep === 0 && cart?.length === 0) ||
                  (activeStep === 1 &&
                    booking.mode !== "report" &&
                    ((activeStep === 1 && booking.mode !== "physical") ||
                      booking.inspectionDays.length === 0 ||
                      !booking.inspectionTime) &&
                    ((activeStep === 1 && booking.mode !== "virtual") ||
                      booking.inspectionDays.length === 0 ||
                      !booking.inspectionTime)) ||
                  (activeStep === 2 &&
                    booking.payment_method !== "onsite" &&
                    ((activeStep === 2 &&
                      booking.payment_method !== "paystack") ||
                      booking.payment_status !== "paid"))
                }
              >
                Next
                
              </Button>
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} className="nextBtnAlt">
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))} */}
            </Box>
          </Grid>
        )}
      </div>
    </Box>
  );
}
