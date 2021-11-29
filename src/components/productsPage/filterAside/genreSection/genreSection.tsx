import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setGenre } from "@/redux/store/products/productsSlice";
import ContainerTitle from "@/elements/containerTitle/containerTitle";
import InputRadioOptions from "@/elements/inputRadioOptions/inputRadioOptions";

const GenreSection = (): JSX.Element => {
  const dispatch = useDispatch();
  const [genre, setGenreLocal] = useState(0);

  const options = [
    {
      id: "all-genres",
      value: 0,
      checked: true,
      label: "All genres",
      name: "genres",
    },
    {
      id: "shooter",
      value: 1,
      checked: false,
      label: "Shooter",
      name: "genres",
    },
    {
      id: "arcade",
      value: 2,
      checked: false,
      label: "Arcade",
      name: "genres",
    },
    {
      id: "survive",
      value: 3,
      checked: false,
      label: "Survive",
      name: "genres",
    },
  ];

  const debouncedSetAge = useCallback(debounce(setGenreLocal, 300), []);

  useEffect(() => {
    dispatch(setGenre(genre));
  }, [genre]);

  return (
    <>
      <ContainerTitle title="Genres" />
      <fieldset id="genres">
        <InputRadioOptions options={options} setValue={debouncedSetAge} />
      </fieldset>
    </>
  );
};

export default GenreSection;
