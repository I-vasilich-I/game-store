import CustomSelect from "@/elements/customSelect/customSelect";
import InputCheckBox from "@/elements/inputCheckBox/inputCheckBox";
import InputNumber from "@/elements/inputNumber/inputNumber";
import { IGame } from "@/types";

interface IProps {
  game: IGame;
  amount: number;
}

const TRow = ({ game: { name, platform, price, id }, amount }: IProps): JSX.Element => {
  const today = new Date().toLocaleDateString("en-US");

  return (
    <tr className="tr">
      <td>{name}</td>
      <td>
        <CustomSelect options={platform as string[]} label="" />
      </td>
      <td>{today}</td>
      <td>
        <InputNumber name={id || 0} amount={amount} />
      </td>
      <td>{price}</td>
      <td>
        <InputCheckBox name={`${id}-ch`} />
      </td>
    </tr>
  );
};

export default TRow;
