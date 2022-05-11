import "./confirmForm.scss";
import { useDispatch } from "react-redux";
import { setModalType } from "@/redux/store/modal/modalSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { AppDispatch } from "@/redux/store/store";
import { deleteProduct } from "@/redux/thunk/productsThunk/productsThunk";

const ConfirmForm = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { editProduct } = useAppSelector((state) => state.PRODUCTS);
  const handleYes = () => {
    dispatch(setModalType("product"));
    if (editProduct) {
      dispatch(deleteProduct(editProduct.id));
    }
  };

  const handleNo = () => {
    dispatch(setModalType("product"));
  };

  return (
    <div className="confirm__form">
      <p>Are you sure you want to delete {editProduct?.name}?</p>
      <div className="buttons__container">
        <button type="button" className="confirm-btn" onClick={handleYes}>
          Yes
        </button>
        <button type="button" className="confirm-btn" onClick={handleNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmForm;
