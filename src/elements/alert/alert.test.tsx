import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Alert from "./alert";

let container: Element | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container === null) {
    return;
  }
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render alert", () => {
  if (container === null) {
    return;
  }

  act(() => {
    render(<Alert type="error" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"alert alert--error\\">
      <p class=\\"alert__title\\">Error</p>
      <p class=\\"alert__body\\">Something went wrong, you'll be redirected to the home page in 5 seconds</p>
    </div>"
  `);

  act(() => {
    render(<Alert type="info" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"alert alert--info\\">
      <p class=\\"alert__title\\">Info</p>
      <p class=\\"alert__body\\">Something went wrong, you'll be redirected to the home page in 5 seconds</p>
    </div>"
  `);

  act(() => {
    render(<Alert type="info" message="info message" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"alert alert--info\\">
      <p class=\\"alert__title\\">Info</p>
      <p class=\\"alert__body\\">info message</p>
    </div>"
  `);
});
