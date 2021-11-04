import { useParams } from "react-router-dom";

interface IParams {
  slug: string;
}

const ProductsPage = (): JSX.Element => {
  const { slug } = useParams<IParams>();

  return <p>You are on Products page, Category: {slug}</p>;
};

export default ProductsPage;
