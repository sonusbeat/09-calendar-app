import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import AppRouter from "../../routers/AppRouter";

// jest.mock("../../../", () => ({
//     actionName: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Simular el dispatch para las pruebas
// store.dispatch = jest.fn();

describe("Pruebas en AppRouter", () => {

  test("Debería de mostrar texto (Loading ...)", () => {
    const initialState = {
      auth: { checking: true },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    const text = "Loading ...";

    expect(wrapper.find("#loading").text()).toBe(text);
  });

  test("Debe de mostrar la ruta pública", () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null,
      },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect( wrapper ).toMatchSnapshot();

    expect( wrapper.find(".login-container").exists() ).toBe(true);
  });

  test("Debe de mostrar la ruta privada", () => {
    const initialState = {
      ui: {
        modalOpen: false,
      },
      calendar: {
        events: [],
      },
      auth: {
        checking: false,
        uid: "0123456789",
        name: "Daniel",
      },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );

    expect( wrapper.find(".calendar-screen").exists() ).toBe(true);
  });

});
