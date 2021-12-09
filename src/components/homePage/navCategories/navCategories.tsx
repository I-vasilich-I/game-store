import "./navCategories.scss";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "@/constants";

const NavCategories = (): JSX.Element => (
  <nav className="nav__categories">
    <ul className="nav__items">
      {CATEGORIES.map(({ link, name, img }) => (
        <li key={name} className="nav__item">
          <NavLink to={link} className="nav__link">
            <img src={img} alt="PC" />
            <p>{name}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default memo(NavCategories);
