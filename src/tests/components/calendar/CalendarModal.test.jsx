import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";

import CalendarModal from "../../../components/calendar/CalendarModal";
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from "../../../actions/eventAction";
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

jest.mock("../../../actions/eventAction", () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

// Cuando estamos utilizando el LocalStorage
// Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

const initialState = {
    ui: {
        modalOpen: true
    },
    calendar: {
        events: [],
        activeEvent: {
            title: "Junta con el equipo de desarrollo",
            notes: "Se va a presentar el sprint de la semana",
            start: now.toDate(),
            end: nowPlus,
        },
    },
    auth: {
        uid: "0123456789",
        name: "John Doe"
    },
};

const store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);

describe("Pruebas en el componente <CalendarModal />", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debería de mostrar el modal", () => {

        expect( wrapper.find( "Modal" ).prop("isOpen") ).toBe(true);

    });

    test('Debería de llamar la acción de actualizar y cerrar el modal', () => {

        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });
        
        expect( eventStartUpdate ).toHaveBeenCalledWith( initialState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalledWith();
        
    });

    test('Debería de mostrar error si falta el título', () => {

        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });
        
        expect( wrapper.find('input[name="title"]').hasClass("is-invalid") ).toBe(true);
        
    });
        
});
