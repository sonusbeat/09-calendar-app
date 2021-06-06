import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";

import CalendarModal from "../../../components/calendar/CalendarModal";
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from "../../../actions/eventAction";
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

// Crear el mock de sweetalert
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

// Crear los mocks de las acciones
jest.mock("../../../actions/eventAction", () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Creamos la fecha de ahora con moment
const now = moment().minutes(0).seconds(0).add(1, "hours");

// Creamos la fecha de ahora más una hora con moment
const nowPlus = now.clone().add(1, "hours");

// Se crea el estado inicial
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

// Se crea el mock store
const store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

// Se monta el Provider con su store
// Y dentro de coloca el componente a probar
const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);

describe("Pruebas en el componente <CalendarModal />", () => {

    // Limpiar todos los mocks antes de ser llamados
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Debería de mostrar el modal", () => {

        // Se busca la propiedad isOpen del componente Modal de terceros y debe ser verdadero
        expect( wrapper.find( "Modal" ).prop("isOpen") ).toBe(true);

    });

    test('Debería de llamar la acción de actualizar y cerrar el modal', () => {

        // Se simular el submit del formulario
        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });

        // Se dispara la acción eventStartUpdate y se comprueba que halle sido llamada
        // con el objeto de activeEvent que se creó en el estado inicial
        expect( eventStartUpdate ).toHaveBeenCalledWith( initialState.calendar.activeEvent );

        // Se dispara la acción eventClearActiveEvent y solo se evalua si ha sido llamada
        expect( eventClearActiveEvent ).toHaveBeenCalledWith();
        
    });

    test('Debería de mostrar error si falta el título', () => {

        // Se ejecuta el formulario
        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });
        
        // Se espera que exista una clase is-valid en el campo title
        // Nota: (esta clase es de bootstrap)
        expect( wrapper.find('input[name="title"]').hasClass("is-invalid") ).toBe(true);
        
    });

    test("Deberia crear un nuevo evento", () => {
        const initialState = {
            ui: {
                modalOpen: true
            },
            calendar: {
                events: [],
                activeEvent: null,
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

        // Se llena el input title con información
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Junta con marketing"
            }
        });

        // Se llena el textarea notes con información
        wrapper.find('textarea[name="notes"]').simulate("change", {
            target: {
                name: "notes",
                value: "Se realizaran estrategias para la próxima campaña de marketing"
            }
        });

        // Se ejecuta el formulario
        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });

        // Se espera que al disparar la acción eventStartAddNew
        // halle sido llamada con el objeto administrado.
        expect( eventStartAddNew ).toHaveBeenCalledWith({
            "title": "Junta con marketing",
            "notes": "Se realizaran estrategias para la próxima campaña de marketing",
            "start": expect.anything(),
            "end": expect.anything(),
        });

        // Se espera que eventClearActiveEvent halle sido llamado
        expect( eventClearActiveEvent ).toHaveBeenCalled();
    });

    test("Debería de validar las fechas", () => {
        // Se llena el campo title
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Junta con el cliente y product owner"
            }
        });

        // Se llena el campo notes
        wrapper.find('textarea[name="notes"]').simulate("change", {
            target: {
                name: "notes",
                value: "Se realizara el contexto para el desarrollo de su app"
            }
        });

        // Se crea la fecha de hoy
        const today = new Date();

        // Se envuelve con act el wrapper de DateTimePicker
        act(() => {
            // Se cambia la fecha final dentro de DateTimePicker con la fecha actual
            // Nota que para cambiar la fecha inicial se debe usar .at(0)
            wrapper.find('DateTimePicker').at(1).prop("onChange")(today);
        });

        // Se envia el formulario
        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });

        // Se espera que el Sweetalert sea llamado con la
        // información administrada
        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error",
            "La fecha final debe de ser mayor a la fecha de inicio",
            "error"
        );
    });
        
});
