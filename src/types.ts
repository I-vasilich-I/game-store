interface IGame {
  id: string;
  name: string;
  cover: string;
  minicover: string;
  description: string;
  rating: number;
  platform: string[];
  age: number;
  year: number;
  price: string | number;
  genre: number;
}

interface IUser {
  email: string | null;
  name?: string | null;
  password?: string | null;
  address?: string | null;
  phone?: string | null;
  photo?: string | null;
  isAdmin?: boolean | string;
  userName?: string | null;
}

interface IProfile {
  name: string;
  oldEmail: string;
  email: string;
  address: string;
  phone: string;
}

type AuthFormTypes = "signin" | "signup" | "password";

type SortByTypes = "name" | "rating" | "price";

type SortDirectionTypes = "Ascending" | "Descending";

interface IAuthForm {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
}

type TInput = "text" | "password" | "email" | "tel" | "number";

type TModalType = "auth" | "product" | "confirm";

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

interface IProductResponse {
  data: string;
  status: number;
}

interface IUserContext {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>> | null;
}

interface IProfileResponse {
  data: IUser | null;
  status: number;
  error?: string;
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
  [key: string]: ICartProduct;
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
  IProductResponse,
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
  TModalType,
};
