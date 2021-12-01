import { ICartProduct } from "@/types";
import TRow from "./tRow/tRow";

interface IProps {
  games: ICartProduct[];
}

const TBody = ({ games }: IProps): JSX.Element => (
  <tbody>
    {games.map(({ game, amount }) => (
      <TRow key={game.id} game={game} amount={amount} />
    ))}
  </tbody>
);

export default TBody;
