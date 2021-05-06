import { combineReducers } from "redux";
import uiReducer from './uiReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  // TODO: AuthReducer,
});

export default rootReducer;