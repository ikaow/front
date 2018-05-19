import { combineReducers } from "redux";
import app from "./ducks/index";

const rootReducer = combineReducers(app);
export default rootReducer;
