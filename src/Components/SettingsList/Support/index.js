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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const Supports = () => {
  const handleSubmit = () => {};
  const [values, setValues] = useState({
    numberformat: "1320000",
  });
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
    <Grid >
      <Grid className="support" >
        <h1>Account Support</h1>
        <br />
        We are here if you need any help
        <Grid sm={9}>
          <Grid py={5} mb={3}>
            <Accordion
              // style={{ width: "100%" }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5>General Help</h5>
              </AccordionSummary>
              <AccordionDetails>
                <Grid py={3}>
                  Visit our <a href="#">help center</a> to learn how to get
                  started with buying and selling of property.
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5>Contact IleNla Support </h5>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Can't find the answers you’re looking for? <br />
                  You can <a href="#">submit a request</a> here.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Supports;
