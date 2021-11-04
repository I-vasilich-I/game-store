import "./searchResult.scss";
import { IGame } from "@/types";
import SearchResultItem from "./searchResultItem/searchResultItem";

interface IProps {
  hasSearchResult: boolean;
  games: IGame[];
}

const SearchResult = ({ hasSearchResult, games }: IProps): JSX.Element => (
  <div className="search-result__container">
    {hasSearchResult ? (
      <ul className="search-result__items">
        {games.map((el) => (
          <SearchResultItem key={el.id} game={el} />
        ))}
      </ul>
    ) : null}
  </div>
);

export default SearchResult;
