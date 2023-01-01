import { Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { REMOVE_CART_ITEM } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "150px",
}));

const BookedPropertyItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleBookingItemDelete = (id) => {
    console.log("delete", id);
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  return (
    <Grid item sm={4} md={4} lg={3} container className="bookingItem">
      <Grid className="bookingPhoto" xs={12} lg={12}>
        <img src={item.files[0].secure_url} />
        <Grid
          className="bookingClose"
          onClick={() => handleBookingItemDelete(item._id)}
        >
          <CloseIcon />
        </Grid>
      </Grid>

      <Grid flexGrow="1">
        <Item elevation={6}>
          <Grid className="bookingTitleAlt">
            <a href={`/properties/${item._id}`}>
              {item?.title.length > 20
                ? `${item?.title.substring(0, 40)} ....`
                : `${item?.title}`}
            </a>
            <Grid
              py={1}
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <span>Location</span>{" "}
              <Grid className="bookingPrice">{item?.address}</Grid>{" "}
            </Grid>
            <Grid
              py={1}
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <span>Asking Price</span>{" "}
              <Grid className="bookingPrice">NGN {item?.price}</Grid>{" "}
            </Grid>
            <Grid></Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default BookedPropertyItem;
