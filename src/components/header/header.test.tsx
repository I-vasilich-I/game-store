import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import customRender from "@/test-utils";
import Header from "./header";

test("Display a heading", () => {
  customRender(<Header />);
  const heading = screen.getByRole("heading", {
    name: /Game store/i,
  });
  expect(heading).toBeInTheDocument();
});
