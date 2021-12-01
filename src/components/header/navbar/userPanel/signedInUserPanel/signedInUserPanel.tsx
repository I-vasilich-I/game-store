import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/store/user/userSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { ROUTES } from "@/constants";
import userSVG from "images/account_circle.svg";
import logoutSVG from "images/logout.svg";
import cartSVG from "images/cart.svg";

const SignedInUserPanel = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName, photo } = useAppSelector((state) => state.USER);
  const { products } = useAppSelector((state) => state.CART);
  const history = useHistory();
  const { home, profile, cart } = ROUTES;
  const gamesInCart = Object.values(products).reduce((acc, b) => acc + b.amount, 0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser({ userName: null, email: null, address: null, phone: null, photo: null }));
    history.push(home);
  };

  const handleProfile = () => {
    history.push(profile);
  };

  return (
    <>
      <li className="nav__item user">
        <img src={photo || userSVG} alt="user" />
        <button type="button" className="profile-btn" onClick={handleProfile}>
          {userName}
        </button>
      </li>
      <li className="nav__item">
        <NavLink to={cart} className="nav__link cart" activeClassName="nav__link--active">
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
