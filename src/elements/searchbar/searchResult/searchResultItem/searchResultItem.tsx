import "./searchResultItem.scss";
import { SyntheticEvent } from "react";
import { IGame } from "@/types";

interface IProps {
  game: IGame;
}

const SearchResultItem = ({ game: { minicover, name, price } }: IProps): JSX.Element => {
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    alert("got product");
  };

  return (
    <li className="search-result__item">
      <a href="/" onClick={handleClick}>
        <img src={minicover} alt={name} />
        <p className="item__title">{name}</p>
        <p>{price} $</p>
      </a>
    </li>
  );
};

export default SearchResultItem;
