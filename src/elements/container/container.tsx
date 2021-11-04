import "./container.scss";
import classnames from "classnames";

interface IProps {
  title: string;
  center?: boolean;
}

const Container: React.FC<IProps> = ({ title, center, children }) => {
  const className = classnames("container__title", {
    "container__title--center": center,
  });

  return (
    <div className="container">
      <h2 className={className}>{title}</h2>
      {children}
    </div>
  );
};

Container.defaultProps = {
  center: false,
};

export default Container;
