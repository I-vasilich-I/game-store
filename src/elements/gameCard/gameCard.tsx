import "./gameCard.scss";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/store/cart/cartSlice";
import { openModal, setModalType } from "@/redux/store/modal/modalSlice";
import { setEditProduct } from "@/redux/store/products/productsSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import useAlert from "@/hooks/useAlert";
import { IGame } from "@/types";
import { GENRES } from "@/constants";
import Rating from "./rating/rating";
import Platforms from "./platforms/platforms";
import ButtonsContainer from "./buttonsContainer/buttonsContainer";
import CardButton from "./button/cardButton";
import Alert from "../alert/alert";

interface IProps {
  game: IGame;
}

const GameCard = ({ game }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const { isAdmin } = useAppSelector((state) => state.USER);
  const { showAlert, setShowAlert } = useAlert();
  const { name, cover, description, rating, age, price, platform, genre } = game;
  const message = "Game(s) added to the cart!";

  console.log(isAdmin);

  const addToCart = () => {
    dispatch(addProduct(game));
    setShowAlert(true);
  };

  const editGameCard = () => {
    dispatch(setModalType("product"));
    dispatch(openModal());
    dispatch(setEditProduct(game));
  };

  return (
    <>
      {showAlert ? <Alert type="info" message={message} /> : null}
      <div className="card__container">
        <div className="card">
          <div className="card__face">
            <img src={cover} alt={name} className="card__cover" />
            <Platforms platform={platform} />
            <div className="card__body">
              <div className="card__title">
                <h3>{name}</h3>
                <span className="card__price">{price} $</span>
              </div>
              <Rating rating={rating || -1} />
            </div>
          </div>
          <div className="card__face card__face--back">
            <p>{description}</p>
            <p>{age}+</p>
            {genre ? <p>{GENRES[genre]}</p> : null}
            <ButtonsContainer>
              <CardButton clickHandler={addToCart} title="Add to cart" />
              {isAdmin ? <CardButton clickHandler={editGameCard} title="Edit" /> : null}
            </ButtonsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
