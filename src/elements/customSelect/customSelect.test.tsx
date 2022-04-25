import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import customRender from "@/test-utils";
import CustomSelect from "./customSelect";

// TODO re-try to use userEvent.click later - now it doesn't work on React 18 (works fine on < 18);
// switched to fireEvent
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
    fireEvent.click(customSelect);
    expect(customSelect).toHaveClass("is-active");

    // does custom select have passed options
    const customSelectOptions = customSelect.getElementsByClassName("select__custom-option");
    expect(customSelectOptions.length).toBe(options.length);

    // click on option
    fireEvent.click(customSelectOptions[1]);
    expect(nativeSelect).toHaveValue(options[1]);
    expect(customSelect).not.toHaveClass("is-active");
  }
});
