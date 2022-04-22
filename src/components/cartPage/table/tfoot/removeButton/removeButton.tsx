import { useDispatch } from "react-redux";
import { removeProducts } from "@/redux/store/cart/cartSlice";
import useHasProductsInCart from "@/hooks/useHasProductsInCart";
import useHasChecked from "@/hooks/useHasChecked";

const RemoveButton = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const hasChecked = useHasChecked();
  const hasProductsInCart = useHasProductsInCart();

  const handleClick = () => {
    if (!hasChecked) {
      return;
    }

    dispatch(removeProducts());
  };

  return hasProductsInCart ? (
    <button type="button" className="cart-btn" onClick={handleClick} disabled={!hasChecked}>
      Remove
    </button>
  ) : null;
};

export default RemoveButton;
