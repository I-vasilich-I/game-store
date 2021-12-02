import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/store/cart/cartSlice";
import { ICartProduct } from "@/types";
import Alert from "@/elements/alert/alert";

interface IProps {
  games: ICartProduct[];
}

const CartControl = ({ games }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const totalCost = useMemo(
    () => games.reduce((acc, b) => acc + +(b.game.price || 0) * b.amount, 0).toFixed(2),
    [games]
  );
  const balance = 250;
  const message = "Game(s) successfully purchased!";
  const isDisabled = +totalCost > balance || +totalCost === 0;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    setShowAlert(true);
    dispatch(removeAllProducts());
  };

  useEffect(() => {
    if (!showAlert) {
      return;
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }, [showAlert, setShowAlert]);

  return (
    <div className="cart__control">
      {showAlert ? <Alert type="info" message={message} /> : null}
      <span>Games cost: {totalCost} $</span>
      <span>Your balance: {balance} $</span>
      <button type="button" className="cart-btn" onClick={handleClick} disabled={isDisabled}>
        Buy
      </button>
    </div>
  );
};

export default CartControl;
