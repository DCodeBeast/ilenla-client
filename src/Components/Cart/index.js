import { Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART } from "../../constants/actionTypes";
import CartItem from "./CartItem";
import "./styles.css";

const Cart = () => {
  let { cart } = useSelector((state) => state.cart);
  const { cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const handleCartClear = () => {
    // CLEAR_CART
    dispatch({ type: CLEAR_CART });
    
  }

  return (
    <Grid p={2} sm={12} className="cart">
      <Grid container pb={2} justifyContent="space-between" alignItems="center">
        <Grid className="title">Bulk Booking ({cart?.length})</Grid>
        {cart.length >0 &&
        <Grid className="cartClear" onClick={handleCartClear}>clear</Grid>}
      </Grid>
      <Grid className="cartBody">
        {cart.length > 0 ? (
          <>
            {" "}
            {cart.map((item) => (
              <CartItem item={item} />
            ))}
          </>
        ) : (
          <Grid
            container
            sm={12}
            pb={3}
            justifyContent="center"
            alignItems="center"
           className='cartEmpty'
          >
            Cart is Empty
          </Grid>
        )}
      </Grid>
      <hr />
      <Grid
        p={1}
        className="cartTotal"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid className="cartText">Cum. Inspection Fee</Grid>
        <Grid>
          <span>NGN</span> {cartTotal.toFixed(2)}
        </Grid>
      </Grid>
      <Grid
        my={1}
      
        container
        justifyContent="center"
        alignItems="center"
      >
        <Button as='a' href='/booking' fullWidth variant="contained" className={cart.length <=0 ? 'disabledBtn' : 'cartBtn'} disabled={cart.length <= 0}>
          Proceed To Book &amp; Pay
        </Button>
      </Grid>
      <Grid>
        <span className="cartTerms">
          By clicking "Proceed To Book &amps; Pay", you agree to the{" "}
          <a href="#" className="cartTermsAlt">
            Ile Nla Terms of Service.
          </a>
          <br />
          Each Booking will incur non-refundable inspection fee.
        </span>
      </Grid>
    </Grid>
  );
};

export default Cart;
