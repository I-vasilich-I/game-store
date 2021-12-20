import "./productControl.scss";
import { useDispatch } from "react-redux";
import { openModal, setModalType } from "@/redux/store/modal/modalSlice";
import { setEditProduct } from "@/redux/store/products/productsSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SearchBar from "@/elements/searchbar/searchbar";

const ProductsControl = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isAdmin } = useAppSelector((state) => state.USER);

  const addGameCard = () => {
    dispatch(setModalType("product"));
    dispatch(setEditProduct(null));
    dispatch(openModal());
  };

  return (
    <div className="products__control">
      <SearchBar />
      {isAdmin ? (
        <button type="button" className="create-btn" onClick={addGameCard}>
          Create card
        </button>
      ) : null}
    </div>
  );
};

export default ProductsControl;
