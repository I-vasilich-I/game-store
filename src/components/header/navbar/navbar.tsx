import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";
import ProductsDropDown from "./productsDropDown/productsDropDown";
import UserPanel from "./userPanel/userPanel";

const Navbar = (): JSX.Element => {
  const { home, products } = ROUTES;

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
        <UserPanel />
      </ul>
    </nav>
  );
};

export default Navbar;
