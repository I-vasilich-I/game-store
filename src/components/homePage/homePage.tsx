import getTopGames from "@/api/apiProducts";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import { IGame } from "@/types";
import { useEffect, useState } from "react";
import "./homePage.scss";
import NavCategories from "./navCategories/navCategories";

const HomePage = (): JSX.Element => {
  const [games, setGames] = useState<IGame[] | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async function topGames() {
      const data = await getTopGames();
      setGames(data);
    })();

    return () => abortController.abort();
  }, []);

  return (
    <div className="wrapper wrapper__home">
      <label htmlFor="search" className="label__search">
        <input type="search" name="search" id="search" className="search" />
      </label>
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
