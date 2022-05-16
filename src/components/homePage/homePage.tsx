import { useGetTopGamesQuery } from "@/redux/store/api/apiSlice";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import useSkeleton from "@/hooks/useSkeleton";
import NavCategories from "./navCategories/navCategories";
import styles from "./homePage.module.scss";

const HomePage = (): JSX.Element => {
  const { data: topProducts, isError, isLoading } = useGetTopGamesQuery(null);

  return (
    <div className={`wrapper ${styles.wrapper__home}`}>
      <SearchBar />
      <section className={styles.section__categories}>
        <Container title="Categories">
          <NavCategories />
        </Container>
      </section>
      <section className={styles.section__games}>
        <Container title="New Games">
          <GameCardsContainer>
            {!isLoading && !isError && topProducts
              ? topProducts.map((elem) => <GameCard game={elem} key={elem.id} />)
              : useSkeleton(3)}
          </GameCardsContainer>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
