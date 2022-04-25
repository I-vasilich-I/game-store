import "./productsPage.scss";
import { lazy, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import Spinner from "@/elements/spinner/spinner";
import { PRODUCTS_SLUGS, ROUTES } from "@/constants";
import FilterAside from "./filterAside/filterAside";

const ProductsSection = lazy(() => import("./productsSection/productsSection"));

interface IRouterParams {
  slug: string;
}

const ProductsPage = (): JSX.Element => {
  const { slug } = useParams<Readonly<IRouterParams>>();
  const { products } = ROUTES;
  const isValidSlug = slug && PRODUCTS_SLUGS.includes(slug);

  if (slug && !isValidSlug) {
    return <Navigate to={products.base} />;
  }

  return (
    <div className="wrapper wrapper__products">
      <FilterAside />
      <Suspense fallback={<Spinner isOn />}>
        <ProductsSection />
      </Suspense>
    </div>
  );
};
export default ProductsPage;
