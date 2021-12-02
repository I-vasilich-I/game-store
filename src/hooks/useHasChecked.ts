import useAppSelector from "@/redux/hooks/useAppSelector";
import { useMemo } from "react";

const useHasChecked = (): boolean => {
  const { products } = useAppSelector((state) => state.CART);
  return useMemo(() => Boolean(Object.values(products).find((elem) => elem.checked)), [products]);
};

export default useHasChecked;
