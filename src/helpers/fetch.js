const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Fetch endpoint without token
 *
 * @param {string} endpoint Example: auth, event
 * @param {Object} data Payload: { email, password }
 * @param {string?} method GET, POST, PUT, PATCH, DELETE
 * @returns {Promise<Response>}
 */
const fetchWithoutToken = ( endpoint, data, method = "GET") => {

  // Example: localhost:3000/api/login
  const url = `${ baseUrl }/${ endpoint }`;

  if ( method === "GET" ) {

    return fetch( url );

  } else {

    return fetch( url, {
      method: method,
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify( data )
    });

  }
};

/**
 * Fetch endpoint without token
 *
 * @param {String} endpoint Example: auth, event
 * @param {Object} data Payload to be sended as object.
 * @param {String?} method GET, POST, PUT, PATCH, DELETE
 * @returns {Promise<Response>}
 */
 const fetchWithToken = ( endpoint, data, method = "GET") => {

  // Example: localhost:3000/api/login
  const url = `${ baseUrl }/${ endpoint }`;

  // Obtener el token del localstorage
  const token = localStorage.getItem("token") || "";

  if ( method === "GET" ) {

    return fetch( url, {
      method,
      headers: {
        "x-token": token
      }
    });

  } else {

    return fetch( url, {
      method: method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify( data )
    });

  }
};

export {
  fetchWithoutToken,
  fetchWithToken,
};
