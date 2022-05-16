import "./searchbar.scss";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useSearchGamesQuery } from "@/redux/store/api/apiSlice";
import Spinner from "@/elements/spinner/spinner";
import SearchResult from "./searchResult/searchResult";

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState("");
  const { data, isFetching } = useSearchGamesQuery(value);
  const hasSearchResult = Boolean(data && value.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

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
        <Spinner isOn={isFetching} />
      </label>
      <SearchResult hasSearchResult={hasSearchResult} games={data || []} />
    </form>
  );
};

export default SearchBar;
