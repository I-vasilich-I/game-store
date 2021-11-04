import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";
import ProductsDropDown from "./productsDropDown/productsDropDown";

const Navbar = (): JSX.Element => {
  const { home, products, about, signin, signup } = ROUTES;

  return (
    <nav className="header__nav">
      <ul className="nav__items">
        <li className="nav__item">
          <NavLink exact to={home} className="nav__link" activeClassName="nav__link--active">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to={products.base} className="nav__link nav__dropdown" activeClassName="nav__link--active">
            Products
          </NavLink>
          <ProductsDropDown />
        </li>
        <li className="nav__item">
          <NavLink to={about} className="nav__link" activeClassName="nav__link--active">
            About
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to={signin} className="nav__link" activeClassName="nav__link--active">
            Sign In
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to={signup} className="nav__link" activeClassName="nav__link--active">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
