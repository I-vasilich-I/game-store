import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "@/redux/store/products/productsSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import { IGame } from "@/types";

interface IRouterParams {
  slug: string;
}

interface IProps {
  products: IGame[];
  isProductsLoading: boolean;
}

const useGetProducts = (): IProps => {
  const dispatch = useDispatch();
  const { products, filter, isProductsLoading } = useAppSelector((state) => state.PRODUCTS);
  const { slug } = useParams<IRouterParams>();

  useEffect(() => {
    dispatch(setCategory(slug || null));
    dispatch({ type: SAGA_ACTIONS.GET_PRODUCTS });
  }, [filter]);

  return { products, isProductsLoading };
};

export default useGetProducts;
