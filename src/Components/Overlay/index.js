import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';

const Overlay = () => {
  return (
    <Grid container alignItems='center' justifyContent='center' style={{background:'rgb(128 128 128 / 46%)', height:'100%', position:'absolute', top:'0', pointerEvents:'none'}}>
        <EditIcon/>
    </Grid>
  )
}

export default Overlay