import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Checkbox,
} from "@mui/material";

import React, { useState } from "react";
import NumberFormat, { InputAttributes } from "react-number-format";
import PropTypes from "prop-types";
import { propertyData } from "../../../constants/data";

import "./styles.css";

const initialState = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  email: "",
  referrer: "",
};
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Verifications = () => {
  const handleSubmit = () => {};
  const [values, setValues] = useState({
    numberformat: "1320000",
  });

  const handleChange = () => {};
  const handleShowPassword = () => {};
  const handleWalletCopy = () => {
    console.log("wallet");
  };

  const handleOfferChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  console.log("values", values);
  return (
    <Grid className="verification">
      <h1>Verifications</h1>
      <br />
      Complete the verification steps below to increase your agent score on
      IleNla platform
      <Grid>
        <Grid spacing={2} py={5} mb={3}>
          <Grid>
            <Grid
              container
            
              justifyContent="space-between"
              alignItems="center"
              py={2}
            >
              <Grid md={10} container alignItems="center" flexWrap='nowrap'>
                <Grid className="verificationCircle"> 1 </Grid>
                <Grid pl={4}>
                  <h5>Basic Verification</h5>
                  <Grid pt={1}>
                    Buy or Sell Property upto 10,000,000.00{" "}
                    <h5 style={{ display: "inline-block" }}> NGN </h5> Nigerian
                    Naira
                  </Grid>
                </Grid>
              </Grid>

              <Grid textAlign="right" md={2} xs={12} justifyContent='right' className='verifyBtn'>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  style={{ textTransform: "Capitalize", fontFamily: "Poppins" }}
                >
                  Begin
                </Button>
              </Grid>
            </Grid>

            <ul>
              <li> Name</li>
              <li>Date of birth</li>
              <li>Residence</li>
            </ul>
          </Grid>
          <Grid>
            <Grid
              container
           
              justifyContent="space-between"
              alignItems="center"
              py={5}
            >
              <Grid sm={10} container alignItems="center" flexWrap='nowrap'>
                <Grid className="verificationCircle"> 2 </Grid>
                <Grid pl={4} >
                  <h5>Advanced Verification</h5>
                  <Grid pt={1}>
                    Buy or Sell Property with no lifetime limits
                  </Grid>
                </Grid>
              </Grid>

              <Grid textAlign="right" md={2} xs={12} justifyContent='right' className='verifyBtn'>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled
                  style={{ textTransform: "Capitalize", fontFamily: "Poppins" }}
                >
                  Begin
                </Button>
              </Grid>
            </Grid>

            <ul>
              <li> Advanced customer verification</li>
              <li>ID Verification</li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Verifications;
