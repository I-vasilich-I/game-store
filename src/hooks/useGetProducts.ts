import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { useGetGamesQuery } from "@/redux/store/api/apiSlice";
import { setCategory } from "@/redux/store/products/productsSlice";
import { AppDispatch } from "@/redux/store/store";
import { IGame } from "@/types";

interface IRouterParams {
  slug: string;
}

interface IProps {
  products: IGame[];
  isProductsLoading: boolean;
}

const useGetProducts = (): IProps => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useAppSelector((state) => state.PRODUCTS);
  const { data, isFetching } = useGetGamesQuery(filter);
  const { slug } = useParams<Readonly<IRouterParams>>();

  useEffect(() => {
    dispatch(setCategory(slug || null));
  }, [slug, filter]);

  return { products: data || [], isProductsLoading: isFetching };
};

export default useGetProducts;
