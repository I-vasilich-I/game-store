import "./containerTitle.scss";
import classnames from "classnames";

interface IProps {
  title: string;
  center?: boolean;
}

const ContainerTitle: React.FC<IProps> = ({ title, center = false }) => {
  const className = classnames("container__title", {
    "container__title--center": center,
  });

  return <h2 className={className}>{title}</h2>;
};

export default ContainerTitle;
