import "./authForm.scss";
import { FormEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import { IInputProps } from "@/types";
import { API, ROUTES, VALIDATE, VALIDATION_MESSAGES } from "@/constants";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";
import ValidationMessage from "@/elements/validationMessage/validationMessage";

type TLocationState = {
  from: {
    pathname: string;
  };
};

const AuthForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { authFormType, status, isLoading } = useAppSelector((state) => state.FORM);
  const history = useHistory();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswords, setIsValidPasswords] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const isValidToSubmit = isValidPasswords && isValidLogin;
  const title = authFormType === "signin" ? "Sign In" : "Sign Up";
  const checkPasswords = "Password field(s) format is invalid";
  const checkLogin = "Login field format is invalid";
  const { profile } = ROUTES;
  const { emailMessage, passwordMessage, repeatPasswordMessage: repeatMessage } = VALIDATION_MESSAGES;
  const isRepeatPasswordValid = VALIDATE.password(repeatPassword);
  const repeatPasswordMessage = isRepeatPasswordValid && password !== repeatPassword ? repeatMessage : passwordMessage;
  const formContent: IInputProps[] = [
    {
      type: "email",
      id: "login",
      required: true,
      title: "Login",
      setValue: setLogin,
      isValid: isValidLogin,
      message: emailMessage,
    },
    {
      type: "password",
      id: "password",
      required: true,
      title: "Password",
      setValue: setPassword,
      isValid: isValidPassword,
      message: passwordMessage,
    },
  ];

  if (authFormType === "signup")
    formContent.push({
      type: "password",
      id: "repeatpassword",
      required: true,
      title: "Repeat password",
      setValue: setRepeatPassword,
      isValid: isValidPasswords,
      message: repeatPasswordMessage,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isValidToSubmit) {
      return;
    }

    e.preventDefault();

    const { signInURL, signUpURL } = API;
    const url = authFormType === "signin" ? signInURL : signUpURL;
    const sendData = {
      email: login,
      password,
      url,
    };

    dispatch({ type: SAGA_ACTIONS.AUTH_USER, payload: sendData });
  };

  useEffect(() => {
    const isLoginValid = VALIDATE.email(login);
    const isPasswordValid = VALIDATE.password(password);
    const isPasswordsValid =
      authFormType === "signup" ? password === repeatPassword && isPasswordValid : isPasswordValid;
    setIsValidPassword(isPasswordValid);
    setIsValidPasswords(isPasswordsValid);
    setIsValidLogin(isLoginValid);
  }, [login, password, repeatPassword]);

  useEffect(() => {
    if (status !== 200 && status !== 201) {
      return;
    }

    if (status === 201) {
      history.push(profile);
    }

    const from = (location.state as TLocationState)?.from;

    if (from?.pathname) {
      history.replace(from.pathname);
    }

    dispatch({ type: SAGA_ACTIONS.MODAL_CLOSE });
  }, [status]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__title">{title}</h3>
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="submit" className="submit-btn" disabled={!isValidToSubmit || isLoading}>
        {title}
        <Spinner isOn={isLoading} />
      </button>
      {isValidLogin ? (
        <ValidationMessage isValid={isValidPasswords} message={checkPasswords} />
      ) : (
        <ValidationMessage isValid={isValidLogin} message={checkLogin} />
      )}
    </form>
  );
};

export default AuthForm;
