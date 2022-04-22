import "./gameCardsContainer.scss";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const GameCardsContainer: React.FC<IProps> = ({ children }) => <div className="game-cards__container">{children}</div>;

export default GameCardsContainer;
