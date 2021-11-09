import "./inputText.scss";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IInputProps } from "@/types";
import { MIN_PASSWORD_LENGTH, VALIDATE } from "@/constants";
import ValidationMessage from "../validationMessage/validationMessage";

const InputText: React.FC<IInputProps> = ({
  type = "text",
  id,
  required = false,
  title = "",
  setValue,
  value,
}): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const validationMessage = {
    text: "*use only letters",
    password: value.length >= MIN_PASSWORD_LENGTH ? "*use only letters and/or numbers" : "*use at least 8 symbols",
    email: "*use an email address",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

  useEffect(() => {
    if (!value) {
      setIsValid(true);
      return;
    }
    if (type === "password") {
      setIsValid(VALIDATE[type](value) && value.length >= MIN_PASSWORD_LENGTH);
      return;
    }
    setIsValid(VALIDATE[type](value));
  }, [value]);

  return (
    <label htmlFor={id} className="label">
      <h4>{title}</h4>
      <input type={type} name={id} id={id} className="input" required={required} onChange={debouncedChangeHandler} />
      <ValidationMessage isValid={isValid} message={validationMessage[type]} />
    </label>
  );
};

export default InputText;
