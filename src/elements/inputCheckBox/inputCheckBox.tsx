import "./inputCheckBox.scss";
import { useEffect, useState } from "react";

interface IProps {
  itemId: number;
  setValueInStore?: ((id: number, checked: boolean) => void) | null;
}

const InputCheckBox: React.FC<IProps> = ({ itemId, setValueInStore = null }): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const id = `${itemId}-ch`;

  const handleChange = () => {
    setChecked((prevValue) => !prevValue);
  };

  useEffect(() => {
    setValueInStore?.(itemId, checked);
  }, [checked]);

  return (
    <label htmlFor={id} className="checkbox__label">
      <input type="checkbox" name={id} id={id} checked={checked} onChange={handleChange} />
    </label>
  );
};

export default InputCheckBox;
