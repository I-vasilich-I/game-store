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
  genre?: number;
}

interface IUser {
  email: string;
  name?: string;
  password?: string;
  address?: string;
  phone?: string;
  photo?: string;
}

type AuthFormTypes = "signin" | "signup" | "password";

type SortByTypes = "name" | "rating" | "price";

type SortDirectionTypes = "Ascending" | "Descending";

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

interface IParams {
  category?: null | string;
  sortBy?: SortByTypes;
  ascend?: null | number;
  age?: number;
  genre?: number;
}

interface IInputRadioOptionProps {
  id: string;
  value: number;
  checked: boolean;
  label: string;
  name?: string;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

interface IInputRadioOptionsProps {
  options: IInputRadioOptionProps[];
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

interface ICartProduct {
  game: IGame;
  amount: number;
  checked: boolean;
}

interface ICartProducts {
  [key: number]: ICartProduct;
}

interface ICart {
  products: ICartProducts;
  checkAll: boolean;
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
  IParams,
  IInputRadioOptionProps,
  IInputRadioOptionsProps,
  SortByTypes,
  SortDirectionTypes,
  ICartProduct,
  ICartProducts,
  ICart,
};
