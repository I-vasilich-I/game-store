/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API } from "@/constants";
import { IGame, IParams, IProductResponse } from "@/types";

const { topGamesURL, searchRequestURL, gamesURL, editProduct } = API;

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

async function updateProductService(game: IGame): Promise<IProductResponse> {
  try {
    const res = await axios.put(editProduct, game);
    const { data, status } = res;
    return { data, status };
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

async function createProductService(game: IGame): Promise<IProductResponse> {
  try {
    const res = await axios.post(editProduct, game);
    const { data, status } = res;
    return { data, status };
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

async function deleteProductService(gameId: string): Promise<IProductResponse> {
  try {
    const res = await axios.delete(`${editProduct}/${gameId}`);
    const { data, status } = res;
    return { data, status };
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

export { getTopGames, searchRequest, getGames, updateProductService, createProductService, deleteProductService };
