interface IGame {
  id?: number;
  name: string;
  cover: string;
  minicover: string;
  description: string;
  rating?: number;
  platform?: string[];
  age?: number;
  year?: number;
  price?: string | number;
}

interface IUser {
  email: string;
  name?: string;
  password: string;
}

type AuthFormTypes = "signin" | "signup";

interface IAuthForm {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
}

interface IInputProps {
  type?: "text" | "password" | "email";
  id: string;
  required?: boolean;
  title?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  message: string;
}

interface IAuthResponse {
  data: string;
  status: number;
}

interface IUserContext {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>> | null;
}

export { IGame, IUser, AuthFormTypes, IAuthForm, IInputProps, IAuthResponse, IUserContext };
