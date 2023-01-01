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



const Offers = () => {
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
    <Grid className="offerContainer">
      <h1>Offer Settings</h1>
      <br />
      Set a minimum offer for collections to ignore low offers.
      <br />
      <br />
      <Button type="submit" variant="outlined" style={{ color: "black" }}>
        View My Offers
      </Button>
      <br />
      <br />
      <Grid sm={9} container justifyContent="space-between" alignItems="center">
        <Grid className='offerText'>
          <h5>Property</h5>
        </Grid>
        <Grid>
          <h5>Minimum Offer</h5>
        </Grid>
      </Grid>
      <Grid >
        <form onSubmit={handleSubmit}>
          <Grid spacing={2} py={5} mb={3}>
            {propertyData.map((property, index) => (
              <Grid
                container
               
                md={9}
                justifyContent="space-between"
                alignItems="center"
                key={index}
                py={2}
              >
                <Grid sm={6} container alignItems="center" flexWrap='nowrap'>
                  <Grid >
                    <img
                      src={property.files}
                      alt="image"
                      style={{ width: "100px",height:'100px', borderRadius:'50%' }}
                    />
                  </Grid>
                  <Grid sm={9} pl={2}>
                    <h5>{property.title}</h5>
                    <Grid pt={2}>
                    
                    
                   price: {new Intl.NumberFormat().format(property.price)} {property.currency[0]}{" "}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sm={6}>
                  <TextField
                    id="standard-read-only-input"
                    name={property.id}
                    variant="outlined"
                    value={values[property.id] ? values[property.id] : 0 }
                    className="wallet"
                    defaultValue="1000000.00"
                    style={{ cursor: "pointer !Important" }}
                    onChange={handleOfferChange}
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      endAdornment: (
                        <InputAdornment position="end">
                            { property.currency[0] === 'NGN' ? <> <h3 className="bold">&#8358;</h3> &nbsp; NGN</>  : 
                    
                         <> <h3 className="bold">&#x24;</h3> &nbsp; US$</>}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid py={3} style={{position:'fixed', width:'100%', background:'white', bottom:'0', borderTop:'0.1px solid #80808085'}} >
            <Grid container sm={6}  className='offerBtn'>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            </Grid>
          
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Offers;
