import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import LoginScreen from "../../../components/auth/LoginScreen";
import { startLogin } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
    startLogin: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {};
const store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
);

describe("Pruebas en <LoginScreen />", () => {

    test("Deberia mostrarse correctamente", () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test("Debería de llamar el dispatch del login", () => {

        const email    = "qbixmex@gmail.com";
        const password = "0123456789";

        wrapper.find('input[name="loginEmail"]').simulate("change", {
            target: {
                name : "loginEmail",
                value: email
            }
        });

        wrapper.find('input[name="loginPassword"]').simulate("change", {
            target: {
                name : "loginPassword",
                value: password
            }
        });

        wrapper.find("#login").prop("onSubmit")({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith( email, password );

    });

});
