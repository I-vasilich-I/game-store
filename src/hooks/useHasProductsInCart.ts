import useAppSelector from "@/redux/hooks/useAppSelector";

const useHasProductsInCart = (): boolean => {
  const { products } = useAppSelector((state) => state.CART);
  return Boolean(Object.values(products).length);
};

export default useHasProductsInCart;
