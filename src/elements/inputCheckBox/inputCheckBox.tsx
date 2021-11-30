import { useState } from "react";
import "./inputCheckBox.scss";

interface IProps {
  name: string;
}

const InputCheckBox = ({ name }: IProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevValue) => !prevValue);
  };

  return (
    <label htmlFor={name} className="checkbox__label">
      <input type="checkbox" name={name} id={name} checked={checked} onChange={handleChange} />
    </label>
  );
};

export default InputCheckBox;
