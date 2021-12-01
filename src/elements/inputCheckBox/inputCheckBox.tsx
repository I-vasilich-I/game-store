import "./inputCheckBox.scss";
import { useEffect, useState } from "react";

interface IProps {
  name: number;
  setValueInStore?: ((id: number, checked: boolean) => void) | null;
}

const InputCheckBox: React.FC<IProps> = ({ name, setValueInStore = null }): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevValue) => !prevValue);
  };

  useEffect(() => {
    setValueInStore?.(name, checked);
  }, [checked]);

  return (
    <label htmlFor={`${name}-ch`} className="checkbox__label">
      <input type="checkbox" name={`${name}-ch`} id={`${name}-ch`} checked={checked} onChange={handleChange} />
    </label>
  );
};

export default InputCheckBox;
