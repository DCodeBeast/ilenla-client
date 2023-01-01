import { Button, Grid } from '@mui/material'
import React from 'react'
import Layout from '../../Components/Layout'
import './styles.css'

const Error = () => {
  return (
    <Layout>
      <Grid
       className='pageOffset'
        >

        <Grid p={5} textAlign='center' style={{fontSize:"40px"}}>
          Page Not Found 
          <br></br>
          <br></br>
          <Button variant="contained" className='errorBtn'><a style={{color:"white"}} href='/'>Return To Home</a></Button>
        </Grid>

        </Grid>
    </Layout>
  )
}

export default Error