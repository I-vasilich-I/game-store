import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import useSkeleton from "@/hooks/useSkeleton";

interface IRouterParams {
  slug: string;
}

const ProductsSection = (): JSX.Element => {
  const dispatch = useDispatch();
  const { products, filter, isProductsLoading } = useAppSelector((state) => state.PRODUCTS);
  const { slug } = useParams<IRouterParams>();

  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.GET_PRODUCTS, payload: { ...filter, category: slug || null } });
  }, [filter, slug]);

  return (
    <section className="section__products">
      <SearchBar />
      <Container title="Products">
        <GameCardsContainer>
          {!isProductsLoading && products.length
            ? products.map((elem) => <GameCard {...elem} key={elem.id} />)
            : useSkeleton(3)}
        </GameCardsContainer>
      </Container>
    </section>
  );
};

export default ProductsSection;
