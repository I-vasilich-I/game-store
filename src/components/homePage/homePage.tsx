import "./homePage.scss";
import { useEffect, useState } from "react";
import { getTopGames } from "@/api/apiProducts";
import { IGame } from "@/types";
import { getGamesFromLocalStorage } from "@/helpers";
import Container from "@/elements/container/container";
import GameCard from "@/elements/gameCard/gameCard";
import GameCardsContainer from "@/elements/gameCardsContainer/gameCardsContainer";
import SearchBar from "@/elements/searchbar/searchbar";
import NavCategories from "./navCategories/navCategories";

const HomePage = (): JSX.Element => {
  const localGames = getGamesFromLocalStorage();
  const [games, setGames] = useState<IGame[] | null>(localGames);

  useEffect(() => {
    if (games) return undefined;
    const abortController = new AbortController();

    (async () => {
      const data = await getTopGames();
      localStorage.setItem("games", JSON.stringify({ data, date: new Date() }));
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
