const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Fetch endpoint without token
 *
 * @param {string} endpoint Example: auth, event
 * @param {Object} data Example: { email, password }
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

// const fetchWithToken = () => {
//   return true;
// };

export {
  fetchWithoutToken,
  // fetchWithToken,
};
