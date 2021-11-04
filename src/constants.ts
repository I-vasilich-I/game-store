import abImg from "images/Activision_Blizzard_Logo.svg";
import bImg from "images/Bungie_Logo.svg";
import eaImg from "images/EA_Logo.svg";
import egImg from "images/Epic_Games_Logo.svg";
import itaImg from "images/iTechArt_Logo.svg";
import nImg from "images/Nintendo_Logo.svg";
import sImg from "images/Sony_Logo.svg";
import seImg from "images/Square_Enix_Logo.svg";

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
  signin: "/signin",
  signup: "/signup",
  errorFallback: "/",
};

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
};

export { ROUTES, GAME_COMPANIES, API };
