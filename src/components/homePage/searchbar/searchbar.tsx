import "./searchbar.scss";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IGame } from "@/types";
import { searchRequest } from "@/api/apiProducts";
import Spinner from "@/elements/spinner/spinner";
import SearchResult from "./searchResult/searchResult";

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState("");
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(false);
  const hasSearchResult = !!(games.length && value.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

  useEffect(() => {
    if (!value.trim()) {
      setGames([]);
      return;
    }

    (async () => {
      setLoading(true);
      const data = await searchRequest(value);
      setGames(data || []);
      setLoading(false);
    })();
  }, [value]);

  return (
    <form className="form">
      <label htmlFor="search" className="label__search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="search"
          onChange={debouncedChangeHandler}
          autoComplete="off"
        />
        <Spinner isOn={loading} />
      </label>
      <SearchResult hasSearchResult={hasSearchResult} games={games} />
    </form>
  );
};

export default SearchBar;
