import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Container from "./container";

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

it("should render container", () => {
  if (container === null) {
    return;
  }

  act(() => {
    render(<Container title="Title" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"sc-bdvvtL hPqzfu\\">
      <h2 class=\\"container__title\\">Title</h2>
    </div>"
  `);
});
