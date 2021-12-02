import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
    dispatch({ type: SAGA_ACTIONS.GET_PRODUCTS, payload: { ...filter, category: slug || null } });
  }, [filter, slug]);

  return { products, isProductsLoading };
};

export default useGetProducts;
