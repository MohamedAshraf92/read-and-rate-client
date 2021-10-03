import { combineReducers } from "redux";

import userReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  categories: categoriesReducer,
});

export default rootReducer;
