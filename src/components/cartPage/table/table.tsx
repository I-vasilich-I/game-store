import { ICartProduct } from "@/types";
import TBody from "./tbody/tbody";
import TFoot from "./tfoot/tfoot";
import THead from "./thead/thead";

interface IProps {
  games: ICartProduct[];
}

const Table = ({ games }: IProps): JSX.Element => (
  <div className="table__wrapper">
    <table className="cart__table">
      <THead />
      <TBody games={games} />
      <TFoot />
    </table>
  </div>
);

export default Table;
