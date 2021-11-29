import "./productsPage.scss";
import { lazy, Suspense } from "react";
import Spinner from "@/elements/spinner/spinner";
import FilterAside from "./filterAside/filterAside";

const ProductsSection = lazy(() => import("./productsSection/productsSection"));

const ProductsPage = (): JSX.Element => (
  <div className="wrapper wrapper__products">
    <FilterAside />
    <Suspense fallback={<Spinner isOn />}>
      <ProductsSection />
    </Suspense>
  </div>
);

export default ProductsPage;
