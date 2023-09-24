import { combineReducers } from "redux";
import { dataOrder } from "./OrderReducers";
import userReducer from "./UserRefucers";

const rootReducer = combineReducers({
  CvTalangkaJaya: dataOrder,
  userReducer,
});

export default rootReducer;
