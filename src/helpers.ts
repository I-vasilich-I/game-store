import { VALIDATE } from "./constants";
import { IGame, TInput } from "./types";

function isRecent(date1: Date, date2: Date): boolean {
  const oneDay = 1 * 24 * 60 * 60 * 1000;
  const timePass = +date1 - +date2;
  return timePass <= oneDay;
}

function getGamesFromLocalStorage(): IGame[] | null {
  const localData = localStorage.getItem("games");
  if (!localData) return null;
  const { data, date } = JSON.parse(localData);
  const today = new Date();
  const dataDate = new Date(date);
  const isDataRecent = isRecent(today, dataDate);
  if (!isDataRecent) {
    return null;
  }

  return data;
}

const validateValue = (value: string, type: TInput): boolean => VALIDATE[type](value);

export { getGamesFromLocalStorage, validateValue };
