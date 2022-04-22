import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/store/user/userSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { ROUTES } from "@/constants";
import { carryClassName } from "@/helpers";
import userSVG from "images/account_circle.svg";
import logoutSVG from "images/logout.svg";
import cartSVG from "images/cart.svg";

const SignedInUserPanel = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName, photo } = useAppSelector((state) => state.USER);
  const { products } = useAppSelector((state) => state.CART);
  const navigate = useNavigate();
  const { home, profile, cart } = ROUTES;
  const gamesInCart = useMemo(() => Object.values(products).reduce((acc, b) => acc + b.amount, 0), [products]);
  // could be used for different img src, in this case just hiding img on a mobile screen.
  // It makes more sense to use css for this purpose though, but since it just a lab project I use this lib
  const isMobile = useMediaQuery({ query: "(max-width: 350px)" });
  const getCartLinkClassName = carryClassName("nav__link cart", "nav__link--active");

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser({ userName: null, email: null, address: null, phone: null, photo: null, isAdmin: false }));
    navigate(home);
  };

  const handleProfile = () => {
    navigate(profile);
  };

  return (
    <>
      <li className="nav__item user">
        {isMobile ? null : <img src={photo || userSVG} alt="user" />}
        <button type="button" className="profile-btn" onClick={handleProfile}>
          {userName}
        </button>
      </li>
      <li className="nav__item">
        <NavLink to={cart} className={({ isActive }) => getCartLinkClassName(isActive)}>
          <img src={cartSVG} alt="cart" />
          <span>{gamesInCart}</span>
        </NavLink>
      </li>
      <li className="nav__item">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <img src={logoutSVG} alt="logout" />
        </button>
      </li>
    </>
  );
};

export default SignedInUserPanel;
