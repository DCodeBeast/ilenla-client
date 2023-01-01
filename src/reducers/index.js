import { combineReducers } from "redux";

import deals from "./deals"
import auth from "./auth"
import properties from "./properties"
import chipData from "./chipData"
import cart from "./cart"

export default combineReducers({
    auth,deals, chipData, cart
})