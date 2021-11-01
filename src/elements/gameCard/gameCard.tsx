import { IGame } from "@/types";
import Rating from "./rating/rating";
import "./gameCard.scss";
import Platforms from "./platforms/platforms";
import CardButton from "./button/cardButton";

const GameCard = ({ name, cover, description, rating, age, price, platform }: IGame): JSX.Element => {
  const handleClick = () => {
    console.log(`Add ${name} to cart`);
  };

  return (
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
          <CardButton clickHandler={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
