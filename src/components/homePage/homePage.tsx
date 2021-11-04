import "./homePage.scss";
import { useEffect, useState } from "react";
import { getTopGames } from "@/api/apiProducts";
import { IGame } from "@/types";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import NavCategories from "./navCategories/navCategories";
import SearchBar from "./searchbar/searchbar";

const HomePage = (): JSX.Element => {
  const [games, setGames] = useState<IGame[] | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const data = await getTopGames();
      setGames(data);
    })();

    return () => abortController.abort();
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
            {games ? games.map((elem) => <GameCard {...elem} key={elem.id} />) : null}
          </GameCardsContainer>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
