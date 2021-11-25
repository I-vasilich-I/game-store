import "./productsPage.scss";
import FilterAside from "./filterAside/filterAside";
import ProductsSection from "./productsSection/productsSection";

const ProductsPage = (): JSX.Element => (
  <div className="wrapper wrapper__products">
    <FilterAside />
    <ProductsSection />
  </div>
);

export default ProductsPage;
