import {combineReducers} from "redux";

import app from './app'
import shoppingCart from './shopping-cart';
import contactsUser from './contacts-info';
import filters from "./filters";

export default combineReducers({
    app,
    filters,
    shoppingCart,
    contactsUser
})


