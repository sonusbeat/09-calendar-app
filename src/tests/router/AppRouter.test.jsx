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
});
