import "./authForm.scss";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import authUser from "@/redux/thunk/authThunk/authThunk";
import onCloseModal from "@/redux/thunk/modalThunk/modalThunk";
import { changeProfilePassword } from "@/redux/thunk/profileThunk/profileThunk";
import { IInputProps } from "@/types";
import { AUTH_FORM_URLS, FORM_TITLES, ROUTES, VALIDATE, VALIDATION_MESSAGES } from "@/constants";
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
  const { email } = useAppSelector((state) => state.USER);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswords, setIsValidPasswords] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const isValidToSubmit = isValidPasswords && isValidLogin;
  const title = FORM_TITLES[authFormType];
  const url = AUTH_FORM_URLS[authFormType];
  const { profile } = ROUTES;
  const {
    emailMessage,
    passwordMessage,
    repeatPasswordMessage: repeatMessage,
    checkPasswords,
    checkLogin,
  } = VALIDATION_MESSAGES;
  const isRepeatPasswordValid = VALIDATE.password(repeatPassword);
  const repeatPasswordMessage = isRepeatPasswordValid && password !== repeatPassword ? repeatMessage : passwordMessage;
  const formContent: IInputProps[] = [];

  const emailInput: IInputProps = {
    type: "email",
    id: "login",
    required: true,
    title: "Login",
    setValue: setLogin,
    isValid: isValidLogin,
    message: emailMessage,
  };

  const passwordInput: IInputProps = {
    type: "password",
    id: "password",
    required: true,
    title: "Password",
    setValue: setPassword,
    isValid: isValidPassword,
    message: passwordMessage,
  };

  const repeatPasswordInput: IInputProps = {
    type: "password",
    id: "repeatpassword",
    required: true,
    title: "Repeat password",
    setValue: setRepeatPassword,
    isValid: isValidPasswords,
    message: repeatPasswordMessage,
  };

  if (authFormType === "signin") {
    formContent.push(emailInput, passwordInput);
  }

  if (authFormType === "signup") {
    formContent.push(emailInput, passwordInput, repeatPasswordInput);
  }

  if (authFormType === "password") {
    formContent.push(passwordInput, repeatPasswordInput);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isValidToSubmit) {
      return;
    }

    e.preventDefault();

    if (authFormType === "password") {
      dispatch(changeProfilePassword({ email, password }));
      return;
    }

    const sendData = {
      email: login,
      password,
      url,
    };

    dispatch(authUser(sendData));
  };

  useEffect(() => {
    const isPasswordValid = VALIDATE.password(password);
    const isPasswordsValid =
      authFormType === "signup" || authFormType === "password"
        ? password === repeatPassword && isPasswordValid
        : isPasswordValid;
    setIsValidPassword(isPasswordValid);
    setIsValidPasswords(isPasswordsValid);

    if (authFormType === "password") {
      setIsValidLogin(true);
      return;
    }

    const isLoginValid = VALIDATE.email(login);
    setIsValidLogin(isLoginValid);
  }, [login, password, repeatPassword]);

  useEffect(() => {
    if (status !== 200 && status !== 201) {
      return;
    }

    if (status === 201) {
      navigate(profile);
    }

    const from = (location.state as TLocationState)?.from;

    if (from?.pathname) {
      navigate(from.pathname, { replace: true });
    }

    dispatch(onCloseModal());
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
