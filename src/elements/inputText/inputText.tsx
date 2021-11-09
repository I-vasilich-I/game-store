import "./inputText.scss";
import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash";
import { IInputProps } from "@/types";

const InputText: React.FC<IInputProps> = ({
  type = "text",
  id,
  required = false,
  title = "",
  setValue,
}): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

  return (
    <label htmlFor={id} className="label">
      <h4>{title}</h4>
      <input type={type} name={id} id={id} className="input" required={required} onChange={debouncedChangeHandler} />
    </label>
  );
};

export default InputText;
