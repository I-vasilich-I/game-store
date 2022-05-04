import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { setCategory } from "@/redux/store/products/productsSlice";
import { getProducts } from "@/redux/thunk/productsThunk/productsThunk";
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
  const { slug } = useParams<Readonly<IRouterParams>>();

  useEffect(() => {
    dispatch(setCategory(slug || null));
    dispatch(getProducts());
  }, [slug, filter]);

  return { products, isProductsLoading };
};

export default useGetProducts;
