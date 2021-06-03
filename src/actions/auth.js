import Swal from 'sweetalert2';

import types from '../types/types';
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { eventLogout } from './eventAction';

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns Promise
 */
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

/**
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @returns Promise
 */
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
    /*
      Es código de una chica en Udemy donde propone poner estas líneas de código
      pero al momento de hacer las pruebas estas fallan
    */
    /*
      // Si no hay token en el local storage o es un string vacio al
      // realizar un localStorage.getItem("token")
      // Devuelve false con el doble !! en vez de null o undefined
      const isCurrentToken = !!(localStorage.getItem("token") || "");

      // Si la variable es false entonces dispara el checkingfinish
      // y retorna la función para que no se siga ejecutando
      if (!isCurrentToken) {
        dispatch(checkingFinish());
        return;
      }
    */

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
      Swal.fire('Error', body.msg, 'error');
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

    // Al salir de la sesión
    // Limpiamos el estado inicial
    dispatch( eventLogout() );


    // Lamamos el logout de la app
    dispatch( logout() );

  };
};

const logout = () => ({ type: types.authLogout });