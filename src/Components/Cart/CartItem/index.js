import { Grid } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { REMOVE_CART_ITEM } from "../../../constants/actionTypes";

const CartItem = ({ item }) => {

const dispatch = useDispatch()
    const handleCartItemDelete = (id) => {
        console.log('delete', id)
        dispatch({ type: REMOVE_CART_ITEM, payload: id });

    }

  return (
    <Grid>
      <Grid container  alignItems="center" >
        <Grid className="cartPhoto">
          <img src={item.files[0].secure_url} />
          <Grid className='cartClose' onClick={() => handleCartItemDelete(item._id)}>
            <CloseIcon/>
          </Grid>
        </Grid>&nbsp;&nbsp;
        <Grid className="cartTitle">
        <a href={`/properties/${item._id}`}>

          {item?.title.length > 20
            ? `${item?.title.substring(0, 40)} ....`
            : `${item?.title}`}
            </a>
        </Grid>
   
      </Grid>
    </Grid>
  );
};

export default CartItem;
