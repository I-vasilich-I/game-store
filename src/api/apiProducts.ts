import { IGame } from "@/types";
import axios from "axios";

async function getTopGames(): Promise<IGame[] | null> {
  let res;
  try {
    res = await axios.get<IGame[]>("http://localhost:8080/api/getTopProducts");
  } catch (error) {
    console.error(error);
  }

  return res?.data || null;
}

export default getTopGames;
