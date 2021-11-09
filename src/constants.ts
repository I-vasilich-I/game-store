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
  about: "/about",
  profile: "/profile",
  errorFallback: "/",
};

const {
  products: { pc, ps, xbox },
} = ROUTES;

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

const API = {
  topGamesURL: "http://localhost:8080/api/getTopProducts",
  searchRequestURL: "http://localhost:8080/api/search/",
  signInURL: "http://localhost:8080/api/auth/signIn",
  signUpURL: "http://localhost:8080/api/auth/signUp",
};

const ERROR_MESSAGES = {
  errorBoundary: "Something went wrong, you'll be redirected to the home page in 5 seconds",
};

const VALIDATE = {
  text: validator.isAlpha,
  password: validator.isAlphanumeric,
  email: validator.isEmail,
};

const MIN_PASSWORD_LENGTH = 8;

export { ROUTES, GAME_COMPANIES, API, CATEGORIES, ERROR_MESSAGES, VALIDATE, MIN_PASSWORD_LENGTH };
