import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";
import { carryClassName } from "@/helpers";
import ProductsDropDown from "./productsDropDown/productsDropDown";
import UserPanel from "./userPanel/userPanel";

const Navbar = (): JSX.Element => {
  const { home, products } = ROUTES;
  const getHomeLinkClassName = carryClassName("nav__link", "nav__link--active");
  const getProductsLinkClassName = carryClassName("nav__link nav__dropdown", "nav__link--active");

  return (
    <nav className="header__nav">
      <ul className="nav__items">
        <li className="nav__item">
          <NavLink end to={home} className={({ isActive }) => getHomeLinkClassName(isActive)}>
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to={products.base} className={({ isActive }) => getProductsLinkClassName(isActive)}>
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
