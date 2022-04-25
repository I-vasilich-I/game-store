import "./filterAside.scss";
import { useParams } from "react-router-dom";
import Container from "@/elements/container/container";
import AgeSection from "./ageSection/ageSection";
import GenreSection from "./genreSection/genreSection";
import SortSection from "./sortSection/sortSection";

interface IRouterParams {
  slug: string;
}

const FilterAside = (): JSX.Element => {
  const { slug } = useParams<Readonly<IRouterParams>>();

  return (
    <aside className="aside__filter">
      <Container title={slug?.toUpperCase() || "All"} center>
        <form className="filter__form">
          <SortSection />
          <GenreSection />
          <AgeSection />
        </form>
      </Container>
    </aside>
  );
};

export default FilterAside;
