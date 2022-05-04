import "./searchbar.scss";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearchGames } from "@/redux/store/products/productsSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { searchProducts } from "@/redux/thunk/productsThunk/productsThunk";
import Spinner from "@/elements/spinner/spinner";
import SearchResult from "./searchResult/searchResult";

const SearchBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { searchGames, isSearching } = useAppSelector((state) => state.PRODUCTS);
  const [value, setValue] = useState("");
  const hasSearchResult = Boolean(searchGames.length && value.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

  useEffect(() => {
    if (!value.trim()) {
      dispatch(setSearchGames([]));
      return;
    }

    dispatch(searchProducts(value));
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
        <Spinner isOn={isSearching} />
      </label>
      <SearchResult hasSearchResult={hasSearchResult} games={searchGames} />
    </form>
  );
};

export default SearchBar;
