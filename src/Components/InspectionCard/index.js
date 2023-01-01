import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./styles.css";
import InspectionDate from "../InspectionDate";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  //   height: 60,
  lineHeight: "60px",
  background: "#e2e2ede8",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export default function InspectionCard({ mode, handleInspectionMode, activeMode}) {

 

  return (
    <Grid item xs={4} className="inspectionCard" onClick={() => handleInspectionMode(mode)}>
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            bgcolor: "#2125294d",
            display: "grid",
          }}
        >
          <Item elevation="16" className={activeMode===mode ? "activeInspectionCardInner" :"inspectionCardInner"}>
            {mode}
            <Grid container justifyContent="flex-end">
              <CheckCircleIcon className={activeMode===mode ?"activeCheckIcon":"checkIcon" }/>
            </Grid>
          </Item>
        </Box>
  

      </Grid>
     
    </Grid>
  );
}
