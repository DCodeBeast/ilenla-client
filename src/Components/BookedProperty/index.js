import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import BookedPropertyItem from "./BookedPropertyItem";
import './styles.css'

const BookedProperty = () => {
  let { cart } = useSelector((state) => state.cart);

  console.log("bk", cart);

  if(cart?.length === 0) return (
    <Grid flexDirection={'column'} container style={{color:'white', minHeight:'50vh'}} justifyContent='center' textAlign='center'>
      No Property Added Yet <br>
      </br>
      <span>
      Add property to continue

      </span>
    </Grid>
  )

  return (
    <Grid  container spacing={4}>
      {cart?.map((item) => (
        <BookedPropertyItem item={item} />
      ))}
    </Grid>
  );
};

export default BookedProperty;
