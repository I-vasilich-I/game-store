import "./cardButton.scss";

interface IProps {
  clickHandler: () => void;
}

const CardButton = ({ clickHandler }: IProps): JSX.Element => (
  <button type="button" className="card__button" onClick={clickHandler}>
    Add to cart
  </button>
);

export default CardButton;
