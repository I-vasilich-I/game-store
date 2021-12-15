import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import customRender from "@/test-utils";
import CustomSelect from "./customSelect";

test("Custom select", () => {
  const options = ["one", "two", "three"];
  customRender(<CustomSelect options={options} label="test-select" />);
  const customSelect = screen.queryByLabelText(/custom-select$/i);
  const nativeSelect = screen.queryByLabelText(/test-select/i);
  const nativeSelectOptions = screen.getAllByRole("option");

  // default state
  expect(customSelect).toHaveClass("select__custom");
  expect(nativeSelect).toHaveClass("select__native");
  expect(nativeSelect).toHaveValue(options[0]);
  expect(nativeSelectOptions.length).toBe(options.length);

  if (customSelect) {
    // open custom select
    userEvent.click(customSelect);
    expect(customSelect).toHaveClass("is-active");

    // does custom select have passed options
    const customSelectOptions = customSelect.getElementsByClassName("select__custom-option");
    expect(customSelectOptions.length).toBe(options.length);

    // click on option
    userEvent.click(customSelectOptions[1]);
    expect(nativeSelect).toHaveValue(options[1]);
    expect(customSelect).not.toHaveClass("is-active");
  }
});
