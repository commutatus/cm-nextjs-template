import { combineReducers } from "redux";
import helperReducer from "./helperReducer";

const reducers = combineReducers({
  helper: helperReducer,
});

export default reducers;
