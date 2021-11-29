/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* based on https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/ */
import "./customSelect.scss";
import { ChangeEvent, useRef, useState, MouseEvent, useEffect } from "react";
import classnames from "classnames";
import { SortByTypes } from "@/types";

interface IProps {
  options: string[];
  label: string;
  dispatcher?: ((value: string) => void) | null;
}

const CustomSelect: React.FC<IProps> = ({ options, label, dispatcher = null }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const customSelectClassName = classnames("select__custom", {
    "is-active": isActive,
  });
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const customSelectRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsActive((prevValue) => !prevValue);
    const element = e.target as HTMLDivElement;

    if (element.className === "select__custom-option") {
      const value = element.getAttribute("data-value") || options[0];
      setSelectedValue(value);
      const nativeSelect = nativeSelectRef.current;

      if (nativeSelect) {
        nativeSelect.value = value;
      }
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

    if (label === "Type") {
      dispatcher?.(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div className="select">
      <span className="select__label" id="job-label">
        {label}
      </span>
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
        <div className={customSelectClassName} aria-hidden={isActive} onClick={handleClick}>
          <div className="select__custom-trigger">{selectedValue}</div>
          <div className="select__custom-options">
            {options.map((elem) => (
              <div key={elem} className="select__custom-option" data-value={elem}>
                {elem}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
