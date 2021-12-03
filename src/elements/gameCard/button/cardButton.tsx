import "./cardButton.scss";

interface IProps {
  clickHandler: () => void;
  title: string;
}

const CardButton = ({ clickHandler, title }: IProps): JSX.Element => (
  <button type="button" className="card__button" onClick={clickHandler}>
    {title}
  </button>
);

export default CardButton;
