import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import { startLogin, startRegister } from "../../actions/auth";
import types from "../../types/types";

import * as fetchModule from "../../helpers/fetch";

// Se crea el mock del Sweet Alert
jest.mock("sweetalert2", () => ({
  // Se espera que se llame un objecto con el método "fire"
  fire: jest.fn(),
}));

// Se crea un arreglo con los middlewares
// en este caso usaremos thunk
const middlewares = [thunk];

// Se configura el mockStore con el arreglo de middlewares anteriores
const mockStore = configureStore(middlewares);

// Se inicializa el estado
const initialState = {};

// Se crea la variable del store con la función de mockStore
// con el objeto del estado inicial
let store = mockStore(initialState);

// Se crea la función para crear el localStorage con setItem
Storage.prototype.setItem = jest.fn();

describe("Pruebas en Auth", () => {
  // Ciclo de vida de las pruebas
  beforeEach(() => {
    // Se limpia el estado en cada iteración
    store = mockStore(initialState);

    // Se limpian los mocks creados
    jest.clearAllMocks();
  });

  test("StartLogin debería funcionar correctamente", async () => {
    // Se hace el dispactch de la acción de startLogin con los argumentos necesarios
    await store.dispatch(startLogin("qbixmex@gmail.com", "password"));

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
        name: expect.any(String),
      },
    });

    // Se expera que se halle llamado la acción de setItem con el token
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    // Se expera que se halle llamado la acción de setItem con el token-init-date
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    // const token = localStorage.setItem.mock.calls[0][1];
    // console.log(token);
  });

  test("Login incorrecto", async () => {
    // Disparamos la acción con el password incorrecto
    await store.dispatch(startLogin("qbixmex@gmail.com", "0123456789"));

    // Se obtienen las acciones del store de Redux
    let actions = store.getActions();

    // Se espera que devuelva un arreglo vacio
    expect(actions).toEqual([]);

    // Se espera que se llame el Sweet Alert con la información administrada
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Contraseña no válida",
      "error"
    );

    // Disparamos la acción con el email incorrecto
    await store.dispatch(startLogin("user@nowhere.com", "password"));

    // Se reasigna la variable "actions" con nuevos valores
    actions = store.getActions();

    // Se espera que se llame el Sweet Alert con la información administrada
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "El usuario no existe con el email administrado",
      "error"
    );
  });

  test("Debería poder registrar un usuario nuevo", async () => {

    // Se simula que se hace un fetch sin token
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "0123456789",
          name: "Fernando",
          token: "abc123defg456",
        };
      },
    }));

    // Se realiza el dispatch para crear un nuevo usuario
    await store.dispatch( startRegister("Fernando", "fer@domain352.com", "0123456789") );

    // Se obtienen las acciones del store
    const actions = store.getActions();

    // Se espera que de las acciones en primera posición
    // sea igual al objecto administrado
    expect( actions[0] ).toEqual({
        type: types.authLogin,
        payload: {
            uid: "0123456789",
            name: "Fernando"
        },
    });

    // Se espera que se halle guardado el localStorage con el token administrado
    expect( localStorage.setItem ).toHaveBeenCalledWith( "token", "abc123defg456" );

    // Se espera que se halle guardado el localStorage con el token-init-date con cualquier número
    expect( localStorage.setItem ).toHaveBeenCalledWith( "token-init-date", expect.any(Number) );
  });
});
