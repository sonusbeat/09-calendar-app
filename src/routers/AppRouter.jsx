import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

const AppRouter = () => {
  const dispatch = useDispatch();

  // Usamos el efecto secundario para disparar
  // la acción de startChecking que sirve si
  // estamos autenticados o no
  useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch]);

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