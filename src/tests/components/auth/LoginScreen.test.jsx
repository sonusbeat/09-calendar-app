import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";


import LoginScreen from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
    startLogin   : jest.fn(),
    startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
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

    beforeEach(() => {
        // Limpiar todo los mocks antes de ser llamados
        jest.clearAllMocks();
    });

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

    test("No debería procesar el registro con campos vacios", () => {

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalledWith();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalled();

    });

    test("No debería procesar el registro con el nombre vacio", () => {

        wrapper.find('input[name="registerName"]').simulate("change", {
            target: {
                name : "registerName",
                value: ""
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalledWith();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "El nombre es obligatorio",
            "error"
        );

    });

    test("No debería procesar el registro con el email vacio", () => {

        wrapper.find('input[name="registerName"]').simulate("change", {
            target: {
                name : "registerName",
                value: "Jhon Doe"
            }
        });

        wrapper.find('input[name="registerEmail"]').simulate("change", {
            target: {
                name : "registerEmail",
                value: ""
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalledWith();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "El email es obligatorio",
            "error"
        );

    });

    test("No debería procesar el registro con la contraseña vacia", () => {

        wrapper.find('input[name="registerEmail"]').simulate("change", {
            target: {
                name : "registerEmail",
                value: "johndoe@domain.com"
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalledWith();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "La contraseña es obligatoria",
            "error"
        );

    });

    test("No debería procesar el registro con la confirmación de contraseña vacia", () => {

        wrapper.find('input[name="registerPassword"]').simulate("change", {
            target: {
                name : "password",
                value: "0123456789"
            }
        });

        wrapper.find('input[name="passwordConfirmation"]').simulate("change", {
            target: {
                name : "password",
                value: "La confirmación de contraseña es obligatoria"
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalledWith();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "La contraseña es obligatoria",
            "error"
        );

    });

    test("No debería procesar el registro con contraseñas diferentes", () => {

        wrapper.find('input[name="registerPassword"]').simulate("change", {
            target: {
                name : "registerPassword",
                value: "0123456789"
            }
        });

        wrapper.find('input[name="passwordConfirmation"]').simulate("change", {
            target: {
                name : "passwordConfirmation",
                value: "9876543210"
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // startRegister NO sea llamado
        expect( startRegister ).not.toHaveBeenCalled();

        // Swal.fire se halle llamado con los argumentos
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "Las contraseñas deben coincidir",
            "error"
        );

    });

    test("Debería procesar el registro con contraseñas iguales", () => {

        wrapper.find('input[name="registerPassword"]').simulate("change", {
            target: {
                name : "registerPassword",
                value: "0123456789"
            }
        });

        wrapper.find('input[name="passwordConfirmation"]').simulate("change", {
            target: {
                name : "passwordConfirmation",
                value: "0123456789"
            }
        });

        wrapper.find("#register").prop("onSubmit")({
            preventDefault(){}
        });

        // Sweet aler NO debe ser llamado
        expect( Swal.fire ).not.toHaveBeenCalled();

        // startRegister DEBE ser llamado
        expect( startRegister ).toHaveBeenCalledWith(
            "Jhon Doe",
            "johndoe@domain.com",
            "0123456789"
        );

    });

});
