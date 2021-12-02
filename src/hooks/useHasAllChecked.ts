import { useMemo } from "react";
import useAppSelector from "@/redux/hooks/useAppSelector";

const useHasAllChecked = (): boolean => {
  const { products } = useAppSelector((state) => state.CART);

  const hasAllChecked = () => {
    const productsArr = Object.values(products);
    return productsArr.length === productsArr.reduce((acc, b) => acc + +b.checked, 0);
  };

  return useMemo(() => hasAllChecked(), [products]);
};

export default useHasAllChecked;
