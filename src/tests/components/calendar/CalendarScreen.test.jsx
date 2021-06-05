import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import CalendarScreen from "../../../components/calendar/CalendarScreen";

// jest.mock("../../../actions/eventAction", () => ({
//     eventStartDelete: jest.fn(),
// }));

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
// store.dispatch = jest.fn();

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

});
