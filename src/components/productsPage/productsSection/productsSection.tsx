import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import useSkeleton from "@/hooks/useSkeleton";
import useGetProducts from "@/hooks/useGetProducts";

const ProductsSection = (): JSX.Element => {
  const { products, isProductsLoading } = useGetProducts();

  return (
    <section className="section__products">
      <SearchBar />
      <Container title="Products">
        <GameCardsContainer>
          {!isProductsLoading && products.length
            ? products.map((elem) => <GameCard game={elem} key={elem.id} />)
            : useSkeleton(3)}
        </GameCardsContainer>
      </Container>
    </section>
  );
};

export default ProductsSection;
