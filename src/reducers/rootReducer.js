import { combineReducers } from "redux";
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  // TODO: AuthReducer,
  // TODO: CalendarReducer,
});

export default rootReducer;