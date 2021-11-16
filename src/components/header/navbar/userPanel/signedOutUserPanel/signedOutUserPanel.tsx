import { useDispatch } from "react-redux";
import { setAuthFormType } from "@/redux/store/form/formSlice";
import { openModal } from "@/redux/store/modal/modalSlice";
import { AuthFormTypes } from "@/types";

interface ILoginButtons {
  type: AuthFormTypes;
  title: string;
}

const SignedOutUserPanel = (): JSX.Element => {
  const dispatch = useDispatch();

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

  const handleClick = (type: AuthFormTypes) => {
    dispatch(openModal());
    dispatch(setAuthFormType(type));
  };

  return (
    <>
      {loginButtons.map(({ type, title }) => (
        <li key={type} className="nav__item">
          <button type="button" className="login-btn" onClick={() => handleClick(type)}>
            {title}
          </button>
        </li>
      ))}
    </>
  );
};

export default SignedOutUserPanel;
