import "./inputCheckBox.scss";
import useInputCheckBox from "@/hooks/useInputCheckBox";

interface IProps {
  itemId: string | null;
  setValueInStore: (id: string, checked: boolean) => void;
}

const InputCheckBox: React.FC<IProps> = ({ itemId = null, setValueInStore }): JSX.Element => {
  const { id, checked, setValue } = useInputCheckBox({ itemId, setValueInStore });

  const handleChange = () => {
    setValue();
  };

  return (
    <label htmlFor={id} className="checkbox__label">
      <input type="checkbox" name={id} id={id} checked={checked} onChange={handleChange} />
    </label>
  );
};

export default InputCheckBox;
