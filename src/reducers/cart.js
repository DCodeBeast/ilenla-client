import { ADD_TO_CART, REMOVE_CART_ITEM, CART_ACTIVE, CLEAR_CART} from "../constants/actionTypes";
let cartLocal = "";
let cart = [];
let cartTotal = "";

const cartReducer = (
  state = { cart: [], cartTotal: "", cartActive: false },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      cartLocal = JSON.parse(localStorage.getItem("cartLocal"));

      if (cartLocal) {
        cart = [...cartLocal];
      }

      if (action.payload) {
        let check = cart.some((cart) => cart._id === action.payload._id);
        console.log("check", check);
        if (check) {
          cart = cart.filter((cart) => cart._id !== action.payload._id);
        } else {
          if (cart.length >= 5) {
            return;
          } else {
            cart.unshift(action.payload);
          }
        }
      }
      localStorage.setItem("cartLocal", JSON.stringify(cart));

      if (cart.length >= 3) {
        cartTotal = cart.length * 2000 - (cart.length / 3) * 500;
      } else {
        cartTotal = cart.length * 2000;
      }
      return { ...state, cart: [...cart], cartTotal: cartTotal, cartActive:false  };

    case REMOVE_CART_ITEM:
      cartLocal = JSON.parse(localStorage.getItem("cartLocal"));

      cart = cartLocal.filter((cart) => cart._id !== action.payload);
      if (cart.length >= 3) {
        cartTotal = cart.length * 2000 - (cart.length / 3) * 500;
      } else {
        cartTotal = cart.length * 2000;
      }
      localStorage.setItem("cartLocal", JSON.stringify(cart));

      return { ...state, cart: [...cart], cartTotal: cartTotal, cartActive:true };

      case CLEAR_CART:
        
      cart = []
      localStorage.setItem("cartLocal", JSON.stringify(cart));

      return { ...state, cart: [], cartTotal:0, cartActive:true  };
      case CART_ACTIVE:
      return { ...state, cartActive: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
