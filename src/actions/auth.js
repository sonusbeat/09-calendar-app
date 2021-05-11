import types from '../types/types';
import { fetchWithoutToken } from "../helpers/fetch";


export const startLogin = ( email, password ) => {

  return async ( dispatch ) => {
    const response = await fetchWithoutToken( "auth", { email, password }, "POST" );
    const body = await response.json();



    if ( body.ok ) {
      // Se guarda el token en el storage
      localStorage.setItem('token', body.token);

      // Para saber cuando va a expirar el token
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch(
        login({
          uid: body.uid,
          name: body.name
        })
      );
    }

  };

};

const login = ( user ) => ({
  type: types.authLogin,
  payload: user
});