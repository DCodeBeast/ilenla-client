import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import BookedPropertyItem from "./BookedPropertyItem";
import './styles.css'

const BookedProperty = () => {
  let { cart } = useSelector((state) => state.cart);

  console.log("bk", cart);

  return (
    <Grid  container spacing={4}>
      {cart?.map((item) => (
        <BookedPropertyItem item={item} />
      ))}
    </Grid>
  );
};

export default BookedProperty;
