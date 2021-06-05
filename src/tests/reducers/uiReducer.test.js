import { uiOpenModal, uiCloseModal } from "../../actions/uiAction";
import uiReducer from "../../reducers/uiReducer";

// Se inicializa el estado
// con sus valores por defecto
const initialState = {
  modalOpen: false
};

describe("Pruebas en uiReducer", () => {

  test("Debería de retornar el estado por defecto", () => {

    // Se guarda el stado con los valos administrados.
    const state = uiReducer(initialState, {});

    // Se espera que el estado retorne el estado inicial.
    expect( state ).toEqual( initialState );

  });

  test("Debería de abrir y cerrar el modal", () => {

    // Se ejecuta la acción para abrir el modal
    const modalOpen = uiOpenModal();

    // Se ejecuta el reducer con la acción anterior
    const stateOpen = uiReducer(initialState, modalOpen);

    // Se comprara el estado anterior con el objecto administrado
    expect( stateOpen ).toEqual( { modalOpen: true } );
    
    // Se ejecuta la acción para cerrar el modal
    const modalClose = uiCloseModal();

    // Se ejecuta el reducer con la acción anterior
    const stateClose = uiReducer(initialState, modalClose);
    
    // Se comprara el estado anterior con el objecto administrado
    expect( stateClose ).toEqual( { modalOpen: false } );

  });

});
