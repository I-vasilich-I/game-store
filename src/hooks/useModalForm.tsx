import useAppSelector from "@/redux/hooks/useAppSelector";
import AuthForm from "@/components/authForm/authForm";
import ProductForm from "@/components/productForm/productForm";
import ConfirmForm from "@/elements/confirmForm/confirmForm";

interface IReturn {
  isModalOpen: boolean;
  modalForm: JSX.Element | null;
}

const useModalForm = (): IReturn => {
  const { isModalOpen, modalType } = useAppSelector((state) => state.MODAL);

  if (modalType === "auth") {
    return { isModalOpen, modalForm: <AuthForm /> };
  }

  if (modalType === "confirm") {
    return { isModalOpen, modalForm: <ConfirmForm /> };
  }

  if (modalType === "product") {
    return { isModalOpen, modalForm: <ProductForm /> };
  }

  return { isModalOpen, modalForm: null };
};

export default useModalForm;
