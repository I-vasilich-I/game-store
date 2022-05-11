import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { getTopProducts } from "@/redux/thunk/productsThunk/productsThunk";
import { AppDispatch } from "@/redux/store/store";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import useSkeleton from "@/hooks/useSkeleton";
import NavCategories from "./navCategories/navCategories";
import styles from "./homePage.module.scss";

const HomePage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { topProducts } = useAppSelector((state) => state.PRODUCTS);

  useEffect(() => {
    if (topProducts.length) {
      return;
    }

    dispatch(getTopProducts());
  }, []);

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
            {topProducts.length ? topProducts.map((elem) => <GameCard game={elem} key={elem.id} />) : useSkeleton(3)}
          </GameCardsContainer>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
