import { readInputLines } from "../utils";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split("\n");

// const rucksacks = testInput;
const rucksacks = readInputLines(3);

const isLowerCase = (str: string): boolean => str.toLowerCase() === str;
const getPriority = (char: string): number =>
  char.charCodeAt(0) - (isLowerCase(char) ? 96 : 38);

const getGroups = (rucksacks: Array<string>): Array<Array<string>> => {
  const groups: Array<Array<string>> = [];

  for (let i = 0; i < rucksacks.length / 3; i++) {
    const group: Array<string> = [];

    for (let j = 0; j < 3; j++) {
      group.push(rucksacks[(i * 3) + j]);
    }

    groups.push(group);
  }

  return groups;
};

const findCommonItem = (group: Array<string>): string => {
  let commonItem;

  const [rucksackA, rucksackB, rucksackC] = group;

  rucksackA.split("").forEach(item => {
    const itemExistsInAllRucksacks =
      rucksackB.includes(item) && rucksackC.includes(item);
    if (itemExistsInAllRucksacks) {
      commonItem = item;
    }
  });

  if (commonItem) {
    return commonItem;
  }

  throw new Error(
    `Could not find common item, ${rucksackA}, ${rucksackB}, ${rucksackC}`,
  );
};

const groups = getGroups(rucksacks);

const totalPriority = groups
  .map(findCommonItem)
  .reduce((accumulator, item) => accumulator + getPriority(item), 0);

console.log({ totalPriority });
