import "./alert.scss";

type IProps = {
  type: "error" | "info";
};

const Alert = ({ type }: IProps): JSX.Element => {
  const message = "Something went wrong, you'll be redirected on the home page in 5 seconds";

  return (
    <div className={["alert", `alert--${type}`].join(" ")}>
      <p className="alert__title">{type === "error" ? "Error" : "Info"}</p>
      <p className="alert__body">{message}</p>
    </div>
  );
};

export default Alert;
