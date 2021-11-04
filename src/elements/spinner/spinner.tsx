import "./spinner.scss";

interface IProps {
  isOn?: boolean;
}

const Spinner = ({ isOn = false }: IProps): JSX.Element | null => (isOn ? <div className="spin" /> : null);

Spinner.defaultProps = {
  isOn: false,
};

export default Spinner;
