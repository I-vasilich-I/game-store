import { ReactNode } from "react";
import "./buttonsContainer.scss";

interface IProps {
  children: ReactNode;
}

const ButtonsContainer = ({ children }: IProps): JSX.Element => <div className="buttons__container">{children}</div>;

export default ButtonsContainer;
