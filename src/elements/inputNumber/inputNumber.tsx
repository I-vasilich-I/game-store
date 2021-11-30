import "./inputNumber.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementAmount, incrementAmount } from "@/redux/store/cart/cartSlice";

interface IProps {
  name: number;
  amount: number;
}

const InputNumber = ({ name, amount }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(amount);

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
    dispatch(incrementAmount(name));
  };

  const decrement = () => {
    if (value === 1) {
      return;
    }

    setValue((prevValue) => prevValue - 1);
    dispatch(decrementAmount(name));
  };

  return (
    <label htmlFor={`${name}-num`} className="amount__label">
      <button type="button" className="amount-ctrl-btn" onClick={decrement}>
        -
      </button>
      <input type="number" name={`${name}-num`} id={`${name}-num`} min={1} value={value} readOnly tabIndex={-1} />
      <button type="button" className="amount-ctrl-btn" onClick={increment}>
        +
      </button>
    </label>
  );
};

export default InputNumber;
