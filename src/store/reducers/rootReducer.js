import { combineReducers } from "redux";

import userReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";
import authorsReducer from "./authorsReducer";
import booksReducer from "./booksReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  categories: categoriesReducer,
  authors: authorsReducer,
  books: booksReducer,
});

export default rootReducer;
