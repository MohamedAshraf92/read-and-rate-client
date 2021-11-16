import { combineReducers } from "redux";

import userReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";
import authorsReducer from "./authorsReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  categories: categoriesReducer,
  authors: authorsReducer,
});

export default rootReducer;
