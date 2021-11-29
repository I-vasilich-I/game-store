import axios from "axios";
import { API } from "@/constants";
import { IGame, IParams } from "@/types";

const { topGamesURL, searchRequestURL, gamesURL } = API;

async function getTopGames(): Promise<IGame[] | null> {
  let res;
  try {
    res = await axios.get<IGame[]>(topGamesURL);
  } catch (error) {
    console.error(error);
  }

  return res?.data || null;
}

async function getGames(params: IParams): Promise<IGame[] | null> {
  let res;
  try {
    res = await axios.get<IGame[]>(gamesURL, { params });
  } catch (error) {
    console.error(error);
  }

  return res?.data || null;
}

async function searchRequest(query: string): Promise<IGame[] | null> {
  let res;
  try {
    res = await axios.get<IGame[]>(`${searchRequestURL}${query}`);
  } catch (error) {
    console.error(error);
  }
  return res?.data || null;
}

export { getTopGames, searchRequest, getGames };
