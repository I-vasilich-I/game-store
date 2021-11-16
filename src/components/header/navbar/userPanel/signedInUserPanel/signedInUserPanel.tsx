import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProp } from "@/redux/store/user/userSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { ROUTES } from "@/constants";
import userSVG from "images/account_circle.svg";
import logoutSVG from "images/logout.svg";

const SignedInUserPanel = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName } = useAppSelector((state) => state.USER);
  const history = useHistory();
  const { home, profile } = ROUTES;

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUserProp({ prop: "userName", value: null }));
    history.push(home);
  };

  const handleProfile = () => {
    history.push(profile);
  };

  return (
    <>
      <li className="nav__item user">
        <img src={userSVG} alt="user" />
        <button type="button" className="profile-btn" onClick={handleProfile}>
          {userName}
        </button>
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
