/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* based on https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/ */
import "./customSelect.scss";
import { ChangeEvent, useRef, useState, useEffect, memo } from "react";
import classnames from "classnames";
import { SortByTypes } from "@/types";

interface IProps {
  options: string[];
  selectedOption?: number;
  label: string;
  dispatcher?: ((value: string) => void) | null;
}

const CustomSelect: React.FC<IProps> = ({ options, selectedOption = -1, label, dispatcher = null }) => {
  const defaultOption = selectedOption === -1 ? options[0] : options[selectedOption];
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultOption);
  const customSelectClassName = classnames("select__custom", {
    "is-active": isActive,
  });
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const customSelectRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsActive((prevValue) => !prevValue);
  };

  const handleClick = (option: string) => {
    setSelectedValue(option);
    const nativeSelect = nativeSelectRef.current;

    if (nativeSelect) {
      nativeSelect.value = option;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOutsideClick = (e: Event) => {
    const element = e.target as HTMLElement;
    const didClickOutside = !customSelectRef.current?.contains(element);
    if (didClickOutside && isActive) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isActive]);

  useEffect(() => {
    if (label === "Criteria") {
      dispatcher?.(selectedValue.toLowerCase() as SortByTypes);
    }

    if (label === "Type" || label === "Age") {
      dispatcher?.(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div className="select">
      {label ? (
        <span className="select__label" id="job-label">
          {label}
        </span>
      ) : null}
      <div className="select__wrapper">
        <select
          ref={nativeSelectRef}
          className="select__native"
          value={selectedValue}
          aria-labelledby="job-label"
          onChange={handleChange}
        >
          {options.map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <div className={customSelectClassName} aria-hidden={isActive} onClick={handleOpen}>
          <div className="select__custom-trigger">{selectedValue}</div>
          <div className="select__custom-options">
            {options.map((elem) => (
              <div key={elem} className="select__custom-option" data-value={elem} onClick={() => handleClick(elem)}>
                {elem}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSelect);
