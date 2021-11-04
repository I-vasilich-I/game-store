import "./spinner.scss";

interface IProps {
  isOn?: boolean;
}

const Spinner: React.FC<IProps> = ({ isOn = false }): JSX.Element | null => (isOn ? <div className="spin" /> : null);

export default Spinner;
