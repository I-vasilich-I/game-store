import "./userPanel.scss";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthFormTypes } from "@/types";
import { ROUTES } from "@/constants";
import UserContext from "@/context/userContext/userContext";
import userSVG from "images/account_circle.svg";
import logoutSVG from "images/logout.svg";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/store/modal/modalSlice";
import { setAuthFormType } from "@/redux/store/form/formSlice";

interface ILoginButtons {
  type: AuthFormTypes;
  title: string;
}

const UserPanel = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName, setUserName } = useContext(UserContext);
  const history = useHistory();
  const { home } = ROUTES;
  const handleClick = (type: AuthFormTypes) => {
    dispatch(openModal());
    dispatch(setAuthFormType(type));
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName?.(null);
    history.push(home);
  };

  const loginButtons: ILoginButtons[] = [
    {
      type: "signin",
      title: "Sign In",
    },
    {
      type: "signup",
      title: "Sign Up",
    },
  ];

  // Will extract components on next tickets, with use of Context or Redux. Props drilling is killing me).

  return (
    <>
      {!userName ? (
        loginButtons.map(({ type, title }) => (
          <li key={type} className="nav__item">
            <button type="button" className="login-btn" onClick={() => handleClick(type)}>
              {title}
            </button>
          </li>
        ))
      ) : (
        <>
          <li className="nav__item user">
            <img src={userSVG} alt="user" />
            <p>{userName}</p>
          </li>
          <li className="nav__item">
            <button type="button" className="logout-btn" onClick={handleLogout}>
              <img src={logoutSVG} alt="logout" />
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default UserPanel;
