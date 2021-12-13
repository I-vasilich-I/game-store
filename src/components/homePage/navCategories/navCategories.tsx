import { memo } from "react";
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "@/constants";
import styles from "./navCategories.module.scss";

const NavCategories = (): JSX.Element => (
  <nav className={styles.nav__categories}>
    <ul className={styles.nav__items}>
      {CATEGORIES.map(({ link, name, img }) => (
        <li key={name} className={styles.nav__item}>
          <NavLink to={link} className={styles.nav__link}>
            <img src={img} alt="PC" />
            <p>{name}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default memo(NavCategories);
