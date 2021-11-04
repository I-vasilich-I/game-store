import "./navCategories.scss";
import { NavLink } from "react-router-dom";
import pcImg from "images/windows_logo.svg";
import psImg from "images/PlayStation_logo.svg";
import xboxImg from "images/Xbox_one_logo.svg";

const NavCategories = (): JSX.Element => (
  <nav className="nav__categories">
    <ul className="nav__items">
      <li className="nav__item">
        <NavLink to="/products/pc" className="nav__link">
          <img src={pcImg} alt="PC" />
          <p>PC</p>
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/products/ps" className="nav__link">
          <img src={psImg} alt="PlayStation" />
          <p>Playstation 5</p>
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/products/xbox" className="nav__link">
          <img src={xboxImg} alt="Xbox" />
          <p>Xbox One</p>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavCategories;
