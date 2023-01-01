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

const Earnings = () => {
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
    <Grid className="">
      <h1>Earnings</h1>

      <Grid>
        <Grid py={2} mb={3}>
          <Grid>
            <Grid justifyContent="space-between" alignItems="center" py={2}>
              <Grid pb={5}>
                To get a full summary of your earnings from property sales made
                on IleNla from a calendar year active. Kindly reach out to us at{" "}
                <a href="mailto: realtorsearnings@ilenla.com">
                  realtorsearnings@ilenla.com
                </a>
                <br />
                <br />
                As a reminder, you are solely responsible for validating this
                information and determining what, if any, taxes apply to your
                property earnings. IleNla does not determine for you what you
                owe.
                <br></br>
              </Grid>
              <Grid container justifyContent='center' className='earningsInfo' p={5}>
                You do not have any realtor earnings from sales using IleNla in
                2021.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Earnings;
