import "./productForm.scss";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditProduct } from "@/redux/store/products/productsSlice";
import { setError, setModalType } from "@/redux/store/modal/modalSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { createProduct, updateProduct } from "@/redux/thunk/productsThunk/productsThunk";
import { AppDispatch } from "@/redux/store/store";
import { IGame, IInputProps } from "@/types";
import { AGES, GENRES, PRODUCT_GENRES } from "@/constants";
import InputText from "@/elements/inputText/inputText";
import Textarea from "@/elements/textarea/textarea";
import CustomSelect from "@/elements/customSelect/customSelect";
import Spinner from "@/elements/spinner/spinner";
import CheckPlatforms from "./checkPlatforms/checkPlatforms";

const ProductForm = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { editProduct, isProductUpdating } = useAppSelector((state) => state.PRODUCTS);
  const [name, setName] = useState(editProduct?.name || "");
  const [category, setCategory] = useState((editProduct?.genre && GENRES[editProduct?.genre]) || PRODUCT_GENRES[0]);
  const [price, setPrice] = useState((editProduct?.price as string) || "");
  const [cover, setCover] = useState(editProduct?.cover || "");
  const [miniCover, setMiniCover] = useState(editProduct?.minicover || "");
  const [description, setDescription] = useState(editProduct?.description || "");
  const [age, setAge] = useState(editProduct?.age || 3);
  const [platformsArr, setPlatformsArr] = useState(editProduct?.platform || []);
  const isPlatformSelected = Boolean(platformsArr.length);
  const selectedAge = AGES.findIndex((elem) => elem === age);
  const ageOptions = AGES.map((elem) => `${elem}+`);
  const selectedCategory = PRODUCT_GENRES.findIndex((elem) => elem === category);

  const textInputsArray: IInputProps[] = [
    {
      type: "text",
      id: "game-name",
      required: true,
      title: "Name",
      value: name,
      setValue: setName,
      isValid: true,
      message: "",
    },
    {
      type: "number",
      id: "game-price",
      required: true,
      title: "Price",
      value: price,
      setValue: setPrice,
      isValid: true,
      message: "",
    },
    {
      type: "text",
      id: "game-cover",
      required: true,
      title: "Cover",
      value: cover,
      setValue: setCover,
      isValid: true,
      message: "",
    },
    {
      type: "text",
      id: "game-mini-cover",
      required: true,
      title: "Mini cover",
      value: miniCover,
      setValue: setMiniCover,
      isValid: true,
      message: "",
    },
  ];

  const setAgeDispatcher = (ageValue: string) => {
    const idx = ageOptions.findIndex((elem) => elem === ageValue);

    if (idx === -1) {
      return;
    }

    setAge(AGES[idx]);
  };

  const setCategoryDispatcher = (categoryValue: string) => {
    setCategory(categoryValue);
  };

  const getNewGameData = (): IGame => {
    const game: IGame = {
      id: editProduct?.id || "",
      name,
      cover,
      minicover: miniCover,
      description,
      rating: 0,
      platform: platformsArr,
      age,
      year: new Date().getFullYear(),
      price: Number(price).toFixed(2),
      genre: GENRES.findIndex((elem) => elem === category),
    };

    return game;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPlatformSelected) {
      dispatch(setError("Choose at least one platform"));
      return;
    }

    if (editProduct) {
      dispatch(updateProduct(getNewGameData()));
      return;
    }

    dispatch(createProduct(getNewGameData()));
  };

  const handleDelete = () => {
    dispatch(setEditProduct(getNewGameData()));
    dispatch(setModalType("confirm"));
  };

  return (
    <form className="product__form" onSubmit={handleSubmit}>
      <div className="product__image">
        <p className="image__title">Game cover</p>
        <img src={cover} alt="game-cover" />
        <p className="image__title">Game mini-cover</p>
        <img src={miniCover} alt="game-mini-cover" />
        <p>Platforms</p>
        <CheckPlatforms checkedPlatforms={platformsArr} setValue={setPlatformsArr} />
      </div>
      <div className="product__info">
        {textInputsArray.map((elem) => (
          <InputText key={elem.id} {...elem} />
        ))}
        <CustomSelect options={ageOptions} selectedOption={selectedAge} label="Age" dispatcher={setAgeDispatcher} />
        <CustomSelect
          options={PRODUCT_GENRES}
          selectedOption={selectedCategory}
          label="Category"
          dispatcher={setCategoryDispatcher}
        />
        <Textarea value={description} setValue={setDescription} label="Description" id="game-description" />
      </div>
      <div className="form__control">
        <button type="submit" className="card-btn">
          Submit
        </button>
        {editProduct ? (
          <button type="button" className="card-btn" onClick={handleDelete}>
            Delete
          </button>
        ) : null}
        <Spinner isOn={isProductUpdating} />
      </div>
    </form>
  );
};

export default ProductForm;
