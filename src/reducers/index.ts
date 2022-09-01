import userReducer from "./user";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: userReducer,
  isLogged: loggedReducer,
});

export default allReducers;
