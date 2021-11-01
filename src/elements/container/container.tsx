import "./container.scss";

interface IProps {
  title: string;
  center?: boolean;
}

const Container: React.FC<IProps> = ({ title, center, children }) => {
  const className = `container__title${center ? " container__title--center" : ""}`;
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
