import abImg from "images/Activision_Blizzard_Logo.svg";
import bImg from "images/Bungie_Logo.svg";
import eaImg from "images/EA_Logo.svg";
import egImg from "images/Epic_Games_Logo.svg";
import itaImg from "images/iTechArt_Logo.svg";
import nImg from "images/Nintendo_Logo.svg";
import sImg from "images/Sony_Logo.svg";
import seImg from "images/Square_Enix_Logo.svg";
import pcImg from "images/windows_logo.svg";
import psImg from "images/PlayStation_logo.svg";
import xboxImg from "images/Xbox_one_logo.svg";
import validator from "validator";

const ROUTES = {
  home: "/",
  products: {
    base: "/products",
    slug: "/products/:slug",
    pc: "/products/pc",
    ps: "/products/ps",
    xbox: "/products/xbox",
  },
  profile: "/profile",
  cart: "/cart",
  errorFallback: "/",
};

const {
  products: { pc, ps, xbox },
} = ROUTES;

const PRODUCTS_SLUGS = ["pc", "ps", "xbox"];

const CATEGORIES = [
  {
    link: pc,
    name: "PC",
    img: pcImg,
  },
  {
    link: ps,
    name: "PlayStation 5",
    img: psImg,
  },
  {
    link: xbox,
    name: "Xbox One",
    img: xboxImg,
  },
];

const GAME_COMPANIES = {
  activisionBlizzard: {
    url: "https://www.activisionblizzard.com/",
    img: abImg,
  },
  bungie: {
    url: "https://www.bungie.net/",
    img: bImg,
  },
  electronicArts: {
    url: "https://www.ea.com/",
    img: eaImg,
  },
  epicGames: {
    url: "https://www.epicgames.com/",
    img: egImg,
  },
  iTechArt: {
    url: "https://www.itechart.com/",
    img: itaImg,
  },
  nintendo: {
    url: "https://www.nintendo.com/",
    img: nImg,
  },
  sony: {
    url: "https://www.sie.com/",
    img: sImg,
  },
  squareEnix: {
    url: "https://www.square-enix.com/",
    img: seImg,
  },
};

const API_BASE_DEV = "http://localhost:8080/api/";
const API_BASE = API_BASE_DEV;

const API = {
  topGamesURL: `${API_BASE}getTopProducts`,
  gamesURL: `${API_BASE}products`,
  searchRequestURL: `${API_BASE}search/`,
  changeProfileInfo: `${API_BASE}saveProfile`,
  changeProfilePhoto: `${API_BASE}changePhoto`,
  photoUploadURL: "https://api.cloudinary.com/v1_1/vasilich/image/upload",
  changePasswordURL: `${API_BASE}changePassword`,
  editProduct: `${API_BASE}product`,
};

const ERROR_MESSAGES = {
  errorBoundary: "Something went wrong, you'll be redirected to the home page in 5 seconds",
};

const MIN_PASSWORD_LENGTH = 8;

const VALIDATE = {
  text: validator.isAlpha,
  password: (passW: string): boolean => validator.isAlphanumeric(passW) && passW.length >= MIN_PASSWORD_LENGTH,
  email: validator.isEmail,
  tel: validator.isMobilePhone,
  number: validator.isInt,
};

const VALIDATION_MESSAGES = {
  textMessage: "*use only letters",
  passwordMessage: "*use letters/numbers, min 8 symbols",
  repeatPasswordMessage: "*passwords don't match",
  emailMessage: "*use an email address",
  lettersAndNumbers: "*use letters/numbers, min 8 symbols",
  mobilePhone: "*use mobile phone",
  addressMessage: "*can't be empty",
  changeInfo: "*change something to save",
  checkPasswords: "password field(s) format is invalid",
  checkLogin: "login field format is invalid",
};

const FORM_TITLES = {
  signin: "Sign In",
  signup: "Sign Up",
  password: "Change password",
};

const AUTH_FORM_URLS = {
  signin: `${API_BASE}auth/signIn`,
  signup: `${API_BASE}auth/signUp`,
  password: `${API_BASE}changePassword`,
};

const GENRES = ["All genres", "Shooter", "Arcade", "Survive"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, ...PRODUCT_GENRES] = GENRES;

const AGES = [3, 6, 12, 18];

interface IPlatforms {
  [name: string]: string;
}

const PLATFORMS: IPlatforms = {
  PC: "PC",
  PS: "PlayStation 5",
  XBox: "XBox One",
};

const MODAL_TYPES = {
  AUTH: "auth",
  CONFIRM: "confirm",
  PRODUCT: "product",
};

export {
  ROUTES,
  GAME_COMPANIES,
  API_BASE,
  API,
  CATEGORIES,
  ERROR_MESSAGES,
  VALIDATE,
  VALIDATION_MESSAGES,
  MIN_PASSWORD_LENGTH,
  FORM_TITLES,
  AUTH_FORM_URLS,
  GENRES,
  AGES,
  PLATFORMS,
  PRODUCT_GENRES,
  MODAL_TYPES,
  PRODUCTS_SLUGS,
};
