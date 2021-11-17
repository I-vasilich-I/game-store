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
  password?: string;
  address?: string;
  phone?: string;
  photo?: string;
}

type AuthFormTypes = "signin" | "signup";

interface IAuthForm {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
}

type TInput = "text" | "password" | "email" | "tel";

interface IInputProps {
  type?: TInput;
  id: string;
  required?: boolean;
  title?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
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

interface IProfile {
  name: string;
  oldEmail: string;
  email: string;
  address: string;
  phone: string;
}

interface IProfileResponse {
  data: IProfile;
  status: number;
}

export {
  IGame,
  IUser,
  AuthFormTypes,
  IAuthForm,
  TInput,
  IInputProps,
  IAuthResponse,
  IUserContext,
  IProfile,
  IProfileResponse,
};
