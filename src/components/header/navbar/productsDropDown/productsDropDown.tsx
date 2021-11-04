import "./productsDropDown.scss";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";

const ProductsDropDown = (): JSX.Element => {
  const { products } = ROUTES;

  return (
    <ul className="dropdown__content">
      <li className="dropdown__nav__item">
        <NavLink to={products.pc} className="dropdown__nav__link" activeClassName="dropdown__nav__link--active">
          PC
        </NavLink>
      </li>
      <li className="dropdown__nav__item">
        <NavLink to={products.ps} className="dropdown__nav__link" activeClassName="dropdown__nav__link--active">
          PlayStation 5
        </NavLink>
      </li>
      <li className="dropdown__nav__item">
        <NavLink to={products.xbox} className="dropdown__nav__link" activeClassName="dropdown__nav__link--active">
          Xbox One
        </NavLink>
      </li>
    </ul>
  );
};

export default ProductsDropDown;
