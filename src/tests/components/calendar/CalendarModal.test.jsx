import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";

// import types from "../../../types/types";
import CalendarModal from "../../../components/calendar/CalendarModal";

// jest.mock("../../../actions/eventAction", () => ({
//     eventSetActive: jest.fn(),
//     eventStartLoading: jest.fn(),
// }));

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
// store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);

describe("Pruebas en el componente <CalendarModal />", () => {

    test("Debería de mostrar el modal", () => {

        expect( wrapper.find( "Modal" ).prop("isOpen") ).toBe(true);

    })
        
});
