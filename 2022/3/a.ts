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

const getCompartments = (rucksack: string): [Array<string>, Array<string>] => {
  const numberOfItemsInRucksack = rucksack.length;

  const compartmentA = rucksack.slice(0, numberOfItemsInRucksack / 2).split("");
  const compartmentB = rucksack.slice(numberOfItemsInRucksack / 2).split("");

  return [compartmentA, compartmentB];
};

const findCommonItem = ([compartmentA, compartmentB]: [
  Array<string>,
  Array<string>,
]): string => {
  let commonItem;

  compartmentA.forEach(item => {
    const itemExistsInBothCompartments = compartmentB.includes(item);
    if (itemExistsInBothCompartments) {
      commonItem = item;
    }
  });

  if (commonItem) {
    return commonItem;
  }

  throw new Error(
    `Could not find any common items in '${compartmentA.join()}' and '${compartmentB.join()}'`,
  );
};

const totalPriority = rucksacks.reduce((accumulator, rucksack) => {
  const compartments = getCompartments(rucksack);
  const commonItem = findCommonItem(compartments);
  const priority = getPriority(commonItem);

  return accumulator + priority;
}, 0);

console.log({ totalPriority });
