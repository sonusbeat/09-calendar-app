import { useEffect } from "react";
import { Redirect, Switch } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import Spinner from '../components/ui/Spinner';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  // Usamos el efecto secundario para disparar
  // la acción de startChecking que sirve si
  // estamos autenticados o no
  useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch]);

  // Llama el Spinner si checking es verdadero
  if (checking) return ( <Spinner /> );

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute
            exact
            path="/login"
            component={ LoginScreen }
            isAuthenticated={ !!uid }
          />

          <PrivateRoute
            exact
            path="/"
            component={ CalendarScreen }
            isAuthenticated={ !!uid }
          />

          <Redirect to="/" />

        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;