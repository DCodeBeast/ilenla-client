import React from "react";
import { Grid } from "@mui/material";

import "./styles.css";

const Footer = () => {
  return (
    <Grid className="footer">
      <Grid container justifyContent='space-between'  py={5} px={2}>
        <Grid sm={12} md={4} xs={12}> </Grid>
        
        <Grid sm={3} md={2}>
            <h5>Properties</h5>
            <ul>
                <li><a href="#">All Properties</a></li>
                <li><a href="#">Property For Rent</a></li>
                <li><a href="#">Property For Sale</a></li>
                <li><a href="#">Landed Properties</a></li>
                <li><a href="#">Properties In Abuja</a></li>
                <li><a href="#">Properties In Lagos</a></li>
                <li><a href="#">Properties Around You</a></li>

            </ul>
        </Grid>
        <Grid sm={3} md={2}>
            <h5>Resources</h5>
            <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Investments</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Newsletter</a></li>
            </ul>
        </Grid>
        <Grid sm={3} md={2}>
            <h5>My Account</h5>
            <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Activity</a></li>
                <li><a href="#">Favorites</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">List A Property</a></li>
               
            </ul>
        </Grid>
        <Grid sm={3} md={2}>
            <h5 style={{color:"black"}}>My Account</h5>
            <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Talk To Our Property Experts</a></li>
                

               
            </ul>
        </Grid>
        
      </Grid>
      <Grid sm={12} py={2} textAlign='center' >
      <hr style={{background:"white", width:'100%'}}></hr>
            &copy; IleNla 2022
      </Grid>

      
    </Grid>
  );
};

export default Footer;
