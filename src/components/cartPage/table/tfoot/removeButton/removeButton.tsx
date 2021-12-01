import { useDispatch } from "react-redux";
import { removeProducts } from "@/redux/store/cart/cartSlice";

const RemoveButton = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeProducts());
  };

  return (
    <button type="button" className="cart-btn" onClick={handleClick}>
      Remove
    </button>
  );
};

export default RemoveButton;
