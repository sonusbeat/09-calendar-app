import { combineReducers } from "redux";
import uiReducer from './uiReducer';
import calendarReducer from './calendarReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
});

export default rootReducer;