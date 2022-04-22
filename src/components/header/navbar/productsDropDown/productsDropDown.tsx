import "./productsDropDown.scss";
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "@/constants";
import { carryClassName } from "@/helpers";

const ProductsDropDown = (): JSX.Element => {
  const getLinkClassName = carryClassName("dropdown__nav__link", "dropdown__nav__link--active");

  return (
    <ul className="dropdown__content">
      {CATEGORIES.map(({ link, name }) => (
        <li key={name} className="dropdown__nav__item">
          <NavLink to={link} className={({ isActive }) => getLinkClassName(isActive)}>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProductsDropDown;
