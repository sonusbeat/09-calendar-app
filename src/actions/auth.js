import types from '../types/types';
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import Swal from 'sweetalert2';


export const startLogin = ( email, password ) => {
  return async ( dispatch ) => {
    const response = await fetchWithoutToken( "auth", { email, password }, "POST" );
    const body = await response.json();

    if ( body.ok ) {
      // Se guarda el token en el storage
      localStorage.setItem('token', body.token);

      // Para saber cuando va a expirar el token
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      // Dispara la acción del login
      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      );
    } else {
      // En caso de que body.ok sea null,
      // lanza un mensaje de error
      Swal.fire("Error", body.msg, "error");
    }

  };
};

export const startRegister = ( name, email, password ) => {
  return async ( dispatch ) => {
    const response = await fetchWithoutToken( "auth/new", { name, email, password }, "POST" );
    const body = await response.json();

    if( body.ok ) {
      // Se guarda el token en el storage
      localStorage.setItem('token', body.token);

      // Para saber cuando va a expirar el token
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      // Dispara la acción del login
      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      );
    } else {
      // En caso de que body.ok sea null,
      // lanza un mensaje de error
      const error_msg = body.errors
        ? Object.values( body.errors )[0].msg
        : body.msg

      Swal.fire( 'Error', error_msg, 'error' );
    }
  }
};

export const startChecking = () => {
  return async ( dispatch ) => {
    const response = await fetchWithToken( "auth/renew" );
    const body = await response.json();

    if ( body.ok ) {
      // Se guarda el token en el storage
      localStorage.setItem('token', body.token);

      // Para saber cuando va a expirar el token
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      // Dispara la acción del login
      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      );
    } else {
      dispatch( checkingFinish() );
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = ( user ) => ({
  type: types.authLogin,
  payload: user
});

export const startLogout = () => {
  return ( dispatch ) => {

    // Borrar el localStorage
    localStorage.clear();

    dispatch( logout() );

  };
};

const logout = () => ({ type: types.authLogout });