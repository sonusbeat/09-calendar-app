import { Redirect, Route, Switch } from "react-router";
import LoginScreen from '../auth/LoginScreen';
import CalendarScreen from '../calendar/CalendarScreen';
import { BrowserRouter as Router } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={ LoginScreen } />
          <Route exact path="/" component={ CalendarScreen } />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;