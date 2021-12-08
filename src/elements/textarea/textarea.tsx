import { ChangeEvent } from "react";
import "./textarea.scss";

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  id: string;
}

const Textarea = ({ value, setValue, label, id }: IProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <label className="textarea__label" htmlFor={id}>
      {label}
      <textarea name={id} id={id} value={value} onChange={handleChange} />
    </label>
  );
};

export default Textarea;
