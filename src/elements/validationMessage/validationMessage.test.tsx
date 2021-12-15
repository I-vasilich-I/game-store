import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import customRender from "@/test-utils";
import ValidationMessage from "./validationMessage";

test("Has active class name", () => {
  customRender(<ValidationMessage isValid={false} message="message" />);
  const message = screen.getByText(/message/i);
  expect(message).toHaveClass("validation--active");
});
