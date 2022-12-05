import { readInputFile } from "../utils";

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// const input = testInput;
const input = readInputFile(5);

type Stack = Array<string>;
type Move = { numberOfBoxes: number; from: number; to: number };

const [arrangement, movesStr] = input.split("\n\n");

const transpose = <T>(array: Array<Array<T>>) =>
  array[0].map((_, c) => array.map((_, r) => array[r][c]).reverse());

const parseStacks = (arrangement: string): Array<Stack> => {
  const rows = arrangement
    .replaceAll("[", "")
    .replaceAll("]", "")
    .split("\n")
    .map(b => b.split("    ").join(" ").split(" "))
    .slice(0, -1);

  const columns = transpose(rows).map(arr => arr.filter(Boolean));
  return columns;
};

const parseMoves = (moveStr: string): Array<Move> => {
  return moveStr
    .replaceAll("move ", "")
    .replaceAll("from ", "")
    .replaceAll("to ", "")
    .split("\n")
    .map(operation => {
      const [move, from, to] = operation
        .split(" ")
        .map(num => parseInt(num, 10));
      return { numberOfBoxes: move, from: from - 1, to: to - 1 };
    });
};

const stacks = parseStacks(arrangement);
const moves = parseMoves(movesStr);

moves.forEach(({ from, to, numberOfBoxes }) => {
  const movedBoxes = stacks[from].splice(
    stacks[from].length - numberOfBoxes,
    numberOfBoxes,
  );

  stacks[to].push(...movedBoxes);
});

const readLastElements = () => {
  return stacks.map(stack => stack.at(-1)).join("");
};

console.log(readLastElements());
