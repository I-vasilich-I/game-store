import "./container.scss";
import ContainerTitle from "../containerTitle/containerTitle";

interface IProps {
  title: string;
  center?: boolean;
}

const Container: React.FC<IProps> = ({ title, center, children }) => (
  <div className="container">
    <ContainerTitle title={title} center={center} />
    {children}
  </div>
);

export default Container;
