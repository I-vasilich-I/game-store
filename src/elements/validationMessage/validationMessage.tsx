import "./validationMessage.scss";
import classNames from "classnames";

interface IProps {
  isValid: boolean;
  message: string;
}

const ValidationMessage = ({ isValid, message }: IProps): JSX.Element => {
  const validationClassName = classNames("validation", {
    "validation--active": !isValid,
  });

  return <p className={validationClassName}>{message}</p>;
};

export default ValidationMessage;
