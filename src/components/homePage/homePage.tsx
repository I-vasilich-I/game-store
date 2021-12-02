import "./homePage.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import useSkeleton from "@/hooks/useSkeleton";
import NavCategories from "./navCategories/navCategories";

const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { topProducts } = useAppSelector((state) => state.PRODUCTS);

  useEffect(() => {
    if (topProducts.length) {
      return;
    }

    dispatch({ type: SAGA_ACTIONS.GET_TOP_PRODUCTS });
  }, []);

  return (
    <div className="wrapper wrapper__home">
      <SearchBar />
      <section className="section__categories">
        <Container title="Categories">
          <NavCategories />
        </Container>
      </section>
      <section className="section__games">
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
