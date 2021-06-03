import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import DeleteEventFab from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/eventAction";

jest.mock("../../../actions/eventAction", () => ({
    eventStartDelete: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {};
const store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

// Se monta el componente respectivamente
const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
);

describe("Pruebas en <DeleteEventFab />", () => {
   
    test("Debería de mostrar el componente correctamente", () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test("Debería de llamar el eventStartDelete al hacer clic", () => {

        wrapper.find("#delete").prop("onClick")();

        expect( eventStartDelete ).toHaveBeenCalled();

    });

});
