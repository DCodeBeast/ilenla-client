import { Grid } from "@mui/material";
import React from "react";
import CustomizedBreadcrumbs from "../../Components/BreadCrumb";
import Header from "../../Components/Header";
import Layout from "../../Components/Layout";
import SettingsMenu from "../../Components/SettingsMenu";

const Settings = () => {
  return (
    <Grid>
      <Header></Header>
      <Grid sm={12} p={2} style={{ height: "100vh" }} className="pageOffset">
   
        <SettingsMenu />
      </Grid>
    </Grid>
  );
};

export default Settings;
