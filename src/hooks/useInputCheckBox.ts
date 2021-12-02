import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCheckAll } from "@/redux/store/cart/cartSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import useHasAllChecked from "./useHasAllChecked";

interface IProps {
  itemId?: number | null;
  setValueInStore: (id: number, checked: boolean) => void;
}

interface IReturnProps {
  id: string;
  setValue: () => void;
  checked: boolean;
}

const useInputCheckBox = ({ itemId = null, setValueInStore }: IProps): IReturnProps => {
  const dispatch = useDispatch();
  const { checkAll, products } = useAppSelector((state) => state.CART);
  const isAllChecked = useHasAllChecked();

  useEffect(() => {
    dispatch(setCheckAll(isAllChecked));
  }, [isAllChecked]);

  if (!itemId) {
    return {
      id: "check-all",
      setValue() {
        // no parameters needed, just a typescript patch;
        setValueInStore(-1, false);
      },
      checked: checkAll,
    };
  }

  const { checked } = products[itemId];
  const id = `${itemId}-ch`;

  return {
    id,
    setValue() {
      setValueInStore(itemId, !checked);
    },
    checked,
  };
};

export default useInputCheckBox;
