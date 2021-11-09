import "./authForm.scss";
import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthFormTypes, IInputProps } from "@/types";
import { API, MIN_PASSWORD_LENGTH, ROUTES, VALIDATE } from "@/constants";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";
import ValidationMessage from "@/elements/validationMessage/validationMessage";
import authenticate from "@/api/apiAuth";

interface IProps {
  type: AuthFormTypes;
  onModalClose?: null | (() => void);
  setError?: null | React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthForm: React.FC<IProps> = ({ type, onModalClose = null, setUserName, setError = null }): JSX.Element => {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [isValidPasswords, setIsValidPasswords] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const title = type === "signin" ? "Sign In" : "Sign Up";
  const checkPasswords = type === "signup" ? "fill in password fields with the same values" : "fill in password field";
  const checkLogin = "fill in login field";
  const { profile } = ROUTES;
  const formContent: IInputProps[] = [
    {
      id: "login",
      required: true,
      title: "Login",
      value: login,
      setValue: setLogin,
    },
    {
      type: "password",
      id: "password",
      required: true,
      title: "Password",
      value: password,
      setValue: setPassword,
    },
  ];

  if (type === "signup")
    formContent.push({
      type: "password",
      id: "repeatpassword",
      required: true,
      title: "Repeat password",
      value: repeatPassword,
      setValue: setRepeatPassword,
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!isValidToSubmit) return;
    setLoading(true);
    e.preventDefault();
    const sendData = {
      name: login,
      password,
    };
    const { signInURL, signUpURL } = API;
    const url = type === "signin" ? signInURL : signUpURL;

    const { data, status } = await authenticate({ url, sendData });
    if (status === 200 || status === 201) {
      setLoading(false);
      localStorage.setItem("userName", data);
      setUserName(data);
      if (status === 201) history.push(profile);
      onModalClose?.();
    }
    setLoading(false);
    setError?.(data);
  };

  useEffect(() => {
    const isLoginValid = VALIDATE.text(login);
    const isPasswordValid = VALIDATE.password(password) && password.length >= MIN_PASSWORD_LENGTH;
    const isPasswordsValid = type === "signup" ? password === repeatPassword && isPasswordValid : isPasswordValid;
    setIsValidToSubmit(isLoginValid && isPasswordsValid);
    setIsValidPasswords(isPasswordsValid);
    setIsValidLogin(isLoginValid);
  }, [login, password, repeatPassword]);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__title">{title}</h3>
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="submit" className="submit-btn" disabled={!isValidToSubmit || loading}>
        {title}
        <Spinner isOn={loading} />
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