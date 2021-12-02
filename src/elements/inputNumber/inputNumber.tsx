import "./inputNumber.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementAmount, incrementAmount } from "@/redux/store/cart/cartSlice";

interface IProps {
  itemId: number;
  amount: number;
}

const InputNumber = ({ itemId, amount }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(amount);
  const id = `${itemId}-num`;

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
    dispatch(incrementAmount(itemId));
  };

  const decrement = () => {
    if (value === 1) {
      return;
    }

    setValue((prevValue) => prevValue - 1);
    dispatch(decrementAmount(itemId));
  };

  return (
    <label htmlFor={id} className="amount__label">
      <button type="button" className="amount-ctrl-btn" onClick={decrement}>
        -
      </button>
      <input type="number" name={id} id={id} min={1} value={value} readOnly tabIndex={-1} />
      <button type="button" className="amount-ctrl-btn" onClick={increment}>
        +
      </button>
    </label>
  );
};

export default InputNumber;
