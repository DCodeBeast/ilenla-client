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

const Notifications = () => {
  const handleSubmit = () => {};
  const [values, setValues] = useState({
    numberformat: "1320000",
  });

  const handleChange = () => {};
  const handleShowPassword = () => {};
  const handleWalletCopy = () => {
    console.log("wallet");
  };

  const handleThresholdChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Grid>
      <h1>Notifications</h1>
      <Grid container  justifyContent="space-between" alignItems="center">
        <Grid  className='notifContainer'>
          <form onSubmit={handleSubmit}>
            <Grid spacing={2}>
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Property Sold</Grid>
                  When someone purchased one of your property
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />

                <Grid>
                  <Grid className="bold">Bid Activity</Grid>
                  When someone bids on one of your property
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Price Change</Grid>
                  When a property you made an offer on changes in price
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Auction Expiration</Grid>
                  When a timed auction you created ends
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Outbid</Grid>
                  When an offer you placed is exceeded by another user
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Owned Property Changes</Grid>
                  When a significant update occurs for one of a property you
                  have purchased on IleNla
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">Successful Purchase</Grid>
                  When you successfully buy an item
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  labelPlacement="end"
                />
                <Grid>
                  <Grid className="bold">IleNla Newsletter</Grid>
                  Occasional updates from the IleNla team
                </Grid>
              </Grid>
              <br />
            </Grid>
            <Grid py={2}>
              <Grid className="bold">Minimum Bid Threshold</Grid>
              <span style={{ display: "block" }}>
                {" "}
                Receive notifications only when you receive offers with a value
                greater than or equal to this amount of NGN.
              </span>

              <br />
            </Grid>

            <Grid pb={2}>
              <Grid
                container
                alignItems="center"
                style={{ cursor: "pointer !Important" }}
              >
                <TextField
                  id="standard-read-only-input"
                  name="numberformat"
                  variant="outlined"
                  value={values.numberformat}
                  className="wallet"
                  defaultValue="1000000.00"
                  style={{ cursor: "pointer !Important" }}
                  onChange={handleThresholdChange}
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">
                        <h3 className="bold">&#8358;</h3> &nbsp; NGN
                      </InputAdornment>
                    ),
                  }}
                  //   onClick={handleCopy}
                />
              </Grid>
            </Grid>
            <Grid pt={3}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Notifications;
