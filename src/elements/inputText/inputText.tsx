import "./inputText.scss";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { IInputProps } from "@/types";
import ValidationMessage from "../validationMessage/validationMessage";

const InputText: React.FC<IInputProps> = ({
  type = "text",
  id,
  required = false,
  title = "",
  setValue,
  value = "",
  isValid,
  message,
}): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

  useEffect(() => {
    const inputElement = inputRef?.current;
    if (!inputElement) return;
    inputElement.value = value;
  }, []);

  return (
    <label htmlFor={id} className="label">
      <h4>{title}</h4>
      <input
        ref={inputRef}
        type={type}
        name={id}
        id={id}
        className="input"
        required={required}
        onChange={debouncedChangeHandler}
      />
      <ValidationMessage isValid={isValid} message={message} />
    </label>
  );
};

export default InputText;
