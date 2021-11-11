import "./alert.scss";
import classNames from "classnames";
import { ERROR_MESSAGES } from "@/constants";

const { errorBoundary } = ERROR_MESSAGES;

type IProps = {
  type: "error" | "info";
  message?: string;
};

const Alert: React.FC<IProps> = ({ type, message = errorBoundary }): JSX.Element => {
  const className = classNames("alert", `alert--${type}`);

  return (
    <div className={className}>
      <p className="alert__title">{type === "error" ? "Error" : "Info"}</p>
      <p className="alert__body">{message}</p>
    </div>
  );
};

export default Alert;
