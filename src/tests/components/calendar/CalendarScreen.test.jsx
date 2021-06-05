import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";

import CalendarScreen from "../../../components/calendar/CalendarScreen";
import calendarMessages from "../../../helpers/calendar-messages-es";
import types from "../../../types/types";
import { eventSetActive } from "../../../actions/eventAction";

jest.mock("../../../actions/eventAction", () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    calendar: {
        events: []
    },
    auth: {
        uid: "0123456789",
        name: "John Doe"
    },
    ui: {
        modalOpen: false
    }
};

const store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

// Se monta el componente respectivamente
const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
);

describe("Pruebas en <CalendarScreen />", () => {

    test("Deberia de coincidir con el Shapshot", () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test("Pruebas con las interacciones del calendario", () => {
        
        // Para buscar un componente de terceros
        // no se debe poner "<Calendar />"
        // solo el texto plano "Calendar"
        const calendar = wrapper.find("Calendar");

        // Buscar una propiedad llamada messages dentro del componente Calendar
        const messages = calendar.prop("messages");

        // Se epera que los mensajes de la propiedad sean iguales a
        // al objeto de calendarMessages que se importa arriba
        expect( messages ).toEqual( calendarMessages );

        // Buscar la propiedad onDoubleClickEvent y ejecutarla
        calendar.prop("onDoubleClickEvent")();

        // Se espera que se dispare la acción y esta halle sido llamada con el tipo requerido
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        // Buscar la propiedad onSelectEvent y ejecutarla
        // pasar el objeto start como el evento
        calendar.prop("onSelectEvent")({ start: "lorem" });

        // Se espera que la acción eventSetActive halle sido llamada
        // con el mismo evento que se mandó
        expect( eventSetActive ).toHaveBeenCalledWith({ start: "lorem" });

        // Se debe envolver con act si no da errores con el token y id
        act(() => {
            // Buscar la propiedad onView y pasar week como argumento
            calendar.prop("onView")("week");
            // Se espera que se halle guardado en el localStorage
            // con "lastView", "week"
            expect( localStorage.setItem ).toHaveBeenCalledWith("lastView", "week");
        });

        // Se busca la propiedad eventPropGetter
        // y se almacena lo que retorna en una variable
        const style = calendar.prop("eventPropGetter")({
            user: {
                _id: "0123456789"
            }
        });
    
        // Se espera que la variable coincida con el objeto administrado
        expect( style ).toEqual({
            style: {
                backgroundColor: '#3667F7',
                borderRadius: '0px',
                opacity: 0.8,
                display: 'block',
                color: '#ffffff'
            }
        });

    });

});
