import { Provider } from "react-redux";

import store from './store/store';
import AppRouter from "./components/routers/AppRouter";

const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
};

export default CalendarApp;