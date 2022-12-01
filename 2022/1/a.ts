import { readInputFile } from "../utils";

const input = readInputFile(1);

const elves = input.split("\n\n");
const elfLuggages = elves.map(elf =>
  elf.split("\n").map(calorie => Number.parseInt(calorie)),
);
const elfTotalCalories = elfLuggages.map(elfLuggage =>
  elfLuggage.reduce((sum, calorie) => sum + calorie, 0),
);

elfTotalCalories.sort((a, b) => b - a);

console.log({ mostCalories: elfTotalCalories[0] });
