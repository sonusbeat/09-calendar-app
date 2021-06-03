import authReducer from "../../reducers/authReducer";
import types from "../../types/types";

const initialState = {
    checking: true,
};

describe("Pruebas en authReducer", () => {

    test("Debería de retornar los valores iniciales", () => {

        const action = {};

        const state = authReducer( initialState, action );

        expect( state ).toEqual( initialState );

    });

    test("Debería autenticar el usuario", () => {

        const user = {
            uid: "576198735419874",
            name: "José",
        }

        const action = {
            type: types.authLogin,
            payload: user
        };

        const state = authReducer( initialState, action );

        expect( state ).toEqual({
            checking: false,
            uid: user.uid,
            name: user.name
        });
    });

    test("Debería realizar el AuthCheckingFinish", () => {

        const action = {
            type: types.authCheckingFinish
        };

        const state = authReducer( initialState, action );

        expect(state).toEqual({ checking: false });

    });


    test("Debería realizar el logout", () => {

        const action = {
            type: types.authLogout
        };

        const state = authReducer( initialState, action );

        expect(state).toEqual({ checking: false });

    });

});
