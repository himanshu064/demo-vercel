import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";

// Root reducer combining multiple reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
