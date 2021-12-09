import "./confirmForm.scss";
import { useDispatch } from "react-redux";
import { setModalType } from "@/redux/store/modal/modalSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";

const ConfirmForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { editProduct } = useAppSelector((state) => state.PRODUCTS);
  const handleYes = () => {
    dispatch(setModalType("product"));
    dispatch({ type: SAGA_ACTIONS.DELETE_PRODUCT, payload: editProduct?.id });
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
