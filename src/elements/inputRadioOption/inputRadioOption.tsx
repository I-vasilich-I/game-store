import "./inputRadioOption.scss";
import { IInputRadioOptionProps } from "@/types";
import { ChangeEvent } from "react";

const InputRadioOption = ({ id, value, checked, label, name, setValue }: IInputRadioOptionProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue?.(+e.target.value);
  };

  return (
    <label htmlFor={id} className="radio__label">
      <input
        className="radio__input"
        type="radio"
        name={name}
        id={id}
        value={value}
        defaultChecked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default InputRadioOption;
