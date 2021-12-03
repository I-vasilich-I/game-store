import "./productControl.scss";
import { useDispatch } from "react-redux";
import { openModal, setIsProductEditForm } from "@/redux/store/modal/modalSlice";
import SearchBar from "@/elements/searchbar/searchbar";

const ProductsControl = (): JSX.Element => {
  const dispatch = useDispatch();

  const addGameCard = () => {
    dispatch(setIsProductEditForm(true));
    dispatch(openModal());
  };

  return (
    <div className="products__control">
      <SearchBar />
      <button type="button" className="create-btn" onClick={addGameCard}>
        Create card
      </button>
    </div>
  );
};

export default ProductsControl;
