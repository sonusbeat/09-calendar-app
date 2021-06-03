import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { startLogin } from "../../actions/auth";
import types from "../../types/types";

// Se crea un arreglo con los middlewares
// en este caso usaremos thunk
const middlewares = [ thunk ];

// Se configura el mockStore con el arreglo de middlewares anteriores
const mockStore = configureStore( middlewares );

// Se inicializa el estado
const initialState = {};

// Se crea la variable del store con la función de mockStore
// con el objeto del estado inicial
let store = mockStore( initialState );

// Se crea la función para crear el localStorage con setItem
Storage.prototype.setItem = jest.fn();

describe("Pruebas en Auth", () => {

    // Ciclo de vida de las pruebas
    beforeEach(() => {
        // Se limpia el estado en cada iteración
        store = mockStore( initialState );

        // Se limpian los mocks creados
        jest.clearAllMocks();
    });

    test('StartLogin debería funcionar correctamente', async () => {

        // Se hace el dispactch de la acción de startLogin con los argumentos necesarios
        await store.dispatch( startLogin("qbixmex@gmail.com", "password") );

        // Se obtienen las acciones del store de Redux
        const actions = store.getActions();

        // Se espera que dentro del arreglo de actions en la primera posición
        // sea igual al objeto que se especifica a continuación:
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                // Se espera que el uid sea cualquier String
                uid: expect.any(String),

                // Se espera que el uid sea cualquier String
                name: expect.any(String)
            }
        });

        // Se expera que se halle llamado la acción de setItem con el token
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any( String ) );

        // Se expera que se halle llamado la acción de setItem con el token-init-date
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );

        // const token = localStorage.setItem.mock.calls[0][1];
        // console.log(token);

    });
    
});