import { Animal } from "./api/api.types";

export type PropsType = Record<string, never>;
export type StateType = { data: Animal[]; isFetching: boolean };
export type ThemeType = "dark" | "light";
