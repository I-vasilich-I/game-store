/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "./redux/store/store";

const customRender = (ui: ReactElement, options?: any): any =>
  render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>,
    options
  );

export default customRender;
