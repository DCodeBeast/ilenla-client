import React from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

import './styles.css'

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  half,
  quarter,
  rows,
  multiline,
  twothird,
  required,
  value, 
  disabled, 
  readonly,
  startAdornment,
  

}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} md={quarter ? 4 : (twothird ? 8 : 12)} className='customInput'>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required={required}
        readonly={readonly}
        disabled={disabled}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        startAdornment={startAdornment}
        rows={4}
        multiline={multiline}
        value={value}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            :(name === 'social' ?  {
              startAdornment: (
                <InputAdornment position="start">
                 <InstagramIcon/>
                </InputAdornment>
              ),
            } : (name === 'website' ?  {
              startAdornment: (
                <InputAdornment position="start">
                 <LanguageIcon/>
                </InputAdornment>
              ),
            } : (name === 'wallet' ?  {
              readOnly: true,
            } : null )  ) )
        }
      />
    </Grid>
  );
};



export default Input;
