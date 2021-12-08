import "./checkPlatforms.scss";
import { useEffect, useState } from "react";
import { PLATFORMS } from "@/constants";

interface IProps {
  checkedPlatforms: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ICheckboxes {
  id: string;
  checked: boolean;
}

const CheckPlatforms = ({ checkedPlatforms, setValue }: IProps): JSX.Element => {
  const keys = Object.keys(PLATFORMS);
  const checkboxesArray: ICheckboxes[] = [];

  keys.forEach((key) => {
    const checkedItem = checkedPlatforms.find((elem) => elem === key);
    checkboxesArray.push({
      id: key,
      checked: Boolean(checkedItem),
    });
  });

  const [checkBoxes, setCheckBoxes] = useState([...checkboxesArray]);

  const handleChange = (id: number) => {
    const boxes = [...checkBoxes];
    boxes[id].checked = !boxes[id].checked;
    setCheckBoxes(boxes);
  };

  useEffect(() => {
    const checkedArr = checkBoxes.reduce<string[]>((acc, { checked, id }) => {
      if (checked) {
        acc.push(id);
      }

      return acc;
    }, []);
    setValue(checkedArr);
  }, [checkBoxes]);

  return (
    <div className="product__platforms">
      {checkBoxes.map(({ id, checked }, arrId) => (
        <div key={id} className="product__checkboxes">
          <label htmlFor={id} className="checkbox__label">
            <input type="checkbox" name={id} id={id} checked={checked} onChange={() => handleChange(arrId)} />
          </label>
          <span>{PLATFORMS[id]}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckPlatforms;
