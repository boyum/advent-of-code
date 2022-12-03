import { readFileSync } from "node:fs";

export const readInputFile = (day: number): string => {
  return readFileSync(`./2022/${day}/input`).toString("utf-8");
};

export const readInputLines = (day: number): Array<string> =>
  readInputFile(day).split("\n");
