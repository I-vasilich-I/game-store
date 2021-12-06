import { useDispatch } from "react-redux";
import { setIsCheckedProduct } from "@/redux/store/cart/cartSlice";
import { IGame } from "@/types";
import CustomSelect from "@/elements/customSelect/customSelect";
import InputCheckBox from "@/elements/inputCheckBox/inputCheckBox";
import InputNumber from "@/elements/inputNumber/inputNumber";

interface IProps {
  game: IGame;
  amount: number;
}

const TRow = ({ game: { name, platform, price, id }, amount }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const today = new Date().toLocaleDateString("en-US");

  const setValueInStore = (itemId: string, checked: boolean) => {
    dispatch(setIsCheckedProduct({ id: itemId, checked }));
  };

  return (
    <tr className="tr">
      <td>{name}</td>
      <td>
        <CustomSelect options={platform as string[]} label="" />
      </td>
      <td>{today}</td>
      <td>
        <InputNumber itemId={id} amount={amount} />
      </td>
      <td>{price}</td>
      <td>
        <InputCheckBox itemId={id} setValueInStore={setValueInStore} />
      </td>
    </tr>
  );
};

export default TRow;
