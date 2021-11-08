import "./authForm.scss";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthFormTypes, IInputProps } from "@/types";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";
import authenticate from "@/api/apiAuth";
import { API, ROUTES } from "@/constants";

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
  const title = type === "signin" ? "Sign In" : "Sign Up";
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

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__title">{title}</h3>
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="submit" className="submit-btn" disabled={loading}>
        {title}
        <Spinner isOn={loading} />
      </button>
    </form>
  );
};

export default AuthForm;
