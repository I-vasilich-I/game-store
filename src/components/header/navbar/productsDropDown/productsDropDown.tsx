import "./productsDropDown.scss";
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "@/constants";

const ProductsDropDown = (): JSX.Element => (
  <ul className="dropdown__content">
    {CATEGORIES.map(({ link, name }) => (
      <li key={name} className="dropdown__nav__item">
        <NavLink to={link} className="dropdown__nav__link" activeClassName="dropdown__nav__link--active">
          {name}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default ProductsDropDown;
