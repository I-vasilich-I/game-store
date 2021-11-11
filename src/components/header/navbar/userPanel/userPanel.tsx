import "./userPanel.scss";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthFormTypes, IAuthForm } from "@/types";
import { ROUTES } from "@/constants";
import UserContext from "@/context/userContext/userContext";
import userSVG from "images/account_circle.svg";
import logoutSVG from "images/logout.svg";

interface ILoginButtons {
  type: AuthFormTypes;
  title: string;
}

const UserPanel = ({ setIsModalOpen, setAuthFormType }: IAuthForm): JSX.Element => {
  const { userName: user, setUserName } = useContext(UserContext);
  const history = useHistory();
  const { home } = ROUTES;
  const handleClick = (type: AuthFormTypes) => {
    setAuthFormType(type);
    setIsModalOpen(true);
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
      {!user ? (
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
            <p>{user}</p>
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
