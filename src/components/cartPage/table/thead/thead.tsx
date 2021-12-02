import { useDispatch } from "react-redux";
import { setCheckAllCheckBoxes } from "@/redux/store/cart/cartSlice";
import useHasProductsInCart from "@/hooks/useHasProductsInCart";
import InputCheckBox from "@/elements/inputCheckBox/inputCheckBox";

const THead = (): JSX.Element => {
  const dispatch = useDispatch();
  const hasProductsInCart = useHasProductsInCart();

  const setValueInStore = () => {
    dispatch(setCheckAllCheckBoxes());
  };

  const checkAll = <InputCheckBox itemId={null} setValueInStore={setValueInStore} />;
  const heads = ["Name", "Platform", "Order date", "Amount", "Price ($)", hasProductsInCart ? checkAll : " "];

  return (
    <thead className="table__thead">
      <tr>
        {heads.map((elem, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <th key={id} className="thead">
            {elem}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
