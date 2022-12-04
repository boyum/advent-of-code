import { readInputLines } from "../utils";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

// const pairs = testInput.split("\n");
const pairs = readInputLines(4);

const getSections = (range: string): Array<number> => {
  const [from, to] = range.split("-").map(str => parseInt(str, 10));
  return Array.from({ length: to - from + 1 }).map((_, index) => index + from);
};

const hasOverlap = <T extends string | boolean | number>(
  a: Array<T>,
  b: Array<T>,
): boolean => {
  return b.some(el => a.includes(el));
};

const pairsWhereOneIsContainedByTheOther = pairs.reduce((accumulator, pair) => {
  const [elfA, elfB] = pair.split(",");

  const aSections = getSections(elfA);
  const bSections = getSections(elfB);

  const thereIsAnyOverlap = hasOverlap(aSections, bSections);

  return accumulator + (thereIsAnyOverlap ? 1 : 0);
}, 0);

console.log({ pairsWhereOneIsContainedByTheOther });
