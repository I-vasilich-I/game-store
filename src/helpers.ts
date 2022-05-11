import classnames from "classnames";
import { VALIDATE } from "./constants";
import { IGame, TInput } from "./types";

function isRecent(date1: Date, date2: Date): boolean {
  const oneDay = 1 * 24 * 60 * 60 * 1000;
  const timePass = +date1 - +date2;
  return timePass <= oneDay;
}

const validateValue = (value: string, type: TInput): boolean => VALIDATE[type](value);

const carryClassName =
  (main: string, active: string) =>
  (isActive: boolean): string =>
    classnames(main, { [active]: isActive });

const setLocalStorageItem = (key: string, value: unknown): void => localStorage.setItem(key, JSON.stringify(value));

function getLocalStorageItem<T>(key: string): T | null {
  const rawData = localStorage.getItem(key);
  return rawData ? JSON.parse(rawData) : null;
}

function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

function getGamesFromLocalStorage(): IGame[] | null {
  type TData = { data: IGame[]; date: string };
  const localData = getLocalStorageItem<TData>("games");

  if (!localData) {
    return null;
  }

  const { data, date } = localData;
  const today = new Date();
  const dataDate = new Date(date);
  const isDataRecent = isRecent(today, dataDate);
  if (!isDataRecent) {
    return null;
  }

  return data;
}

export {
  getGamesFromLocalStorage,
  validateValue,
  carryClassName,
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
};
