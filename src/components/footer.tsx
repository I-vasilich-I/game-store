import "./footer.scss";
import { GAME_COMPANIES } from "@/conststants";

const Footer = (): JSX.Element => {
  const { activisionBlizzard, bungie, electronicArts, epicGames, iTechArt, nintendo, sony, squareEnix } =
    GAME_COMPANIES;

  return (
    <footer className="footer">
      <div className="wrapper wrapper__footer">
        <h4>Incredible convenient</h4>
        <nav className="footer__nav">
          <ul className="nav__items">
            <li className="nav__item">
              <a href={activisionBlizzard.url} target="_blank" rel="noreferrer">
                <img src={activisionBlizzard.img} alt="activisionBlizzard" />
              </a>
            </li>
            <li className="nav__item">
              <a href={bungie.url} target="_blank" rel="noreferrer">
                <img src={bungie.img} alt="bungie" />
              </a>
            </li>
            <li className="nav__item">
              <a href={electronicArts.url} target="_blank" rel="noreferrer">
                <img src={electronicArts.img} alt="electronicArts" />
              </a>
            </li>
            <li className="nav__item">
              <a href={epicGames.url} target="_blank" rel="noreferrer">
                <img src={epicGames.img} alt="epicGames" />
              </a>
            </li>
            <li className="nav__item">
              <a href={iTechArt.url} target="_blank" rel="noreferrer">
                <img src={iTechArt.img} alt="iTechArt" />
              </a>
            </li>
            <li className="nav__item">
              <a href={nintendo.url} target="_blank" rel="noreferrer">
                <img src={nintendo.img} alt="nintendo" />
              </a>
            </li>
            <li className="nav__item">
              <a href={sony.url} target="_blank" rel="noreferrer">
                <img src={sony.img} alt="sony" />
              </a>
            </li>
            <li className="nav__item">
              <a href={squareEnix.url} target="_blank" rel="noreferrer">
                <img src={squareEnix.img} alt="squareEnix" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
