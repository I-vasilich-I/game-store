import useAppSelector from "@/redux/hooks/useAppSelector";
import { MODAL_TYPES } from "@/constants";
import AuthForm from "@/components/authForm/authForm";
import ProductForm from "@/components/productForm/productForm";
import ConfirmForm from "@/elements/confirmForm/confirmForm";

interface IReturn {
  isModalOpen: boolean;
  modalForm: JSX.Element | null;
}

const useModalForm = (): IReturn => {
  const { isModalOpen, modalType } = useAppSelector((state) => state.MODAL);
  const { AUTH, CONFIRM, PRODUCT } = MODAL_TYPES;

  if (modalType === AUTH) {
    return { isModalOpen, modalForm: <AuthForm /> };
  }

  if (modalType === CONFIRM) {
    return { isModalOpen, modalForm: <ConfirmForm /> };
  }

  if (modalType === PRODUCT) {
    return { isModalOpen, modalForm: <ProductForm /> };
  }

  return { isModalOpen, modalForm: null };
};

export default useModalForm;
