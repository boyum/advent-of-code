import { readInputFile } from "../utils";

const testInput = `30373
25512
65332
33549
35390`;

// const input = testInput;
const input = readInputFile(8);

const grid = input
  .split("\n")
  .map(row => row.split("").map(str => parseInt(str, 10)));

const numberOfTreesLeft = (x: number, y: number, height: number): number => {
  const edgeIndex = 0;

  const isOnLeftmostEdge = x === edgeIndex;
  if (isOnLeftmostEdge) {
    return 0;
  }

  let numberOfTrees = 0;
  for (let i = x - 1; i > edgeIndex - 1; i--) {
    const h = grid[y][i];
    const isVisible = h < height;

    numberOfTrees++;
    if (!isVisible) {
      break;
    }
  }

  return numberOfTrees;
};

const numberOfTreesRight = (x: number, y: number, height: number): number => {
  const edgeIndex = grid[0].length - 1;

  const isOnRightmostEdge = x === edgeIndex;
  if (isOnRightmostEdge) {
    return 0;
  }

  let numberOfTrees = 0;
  for (let i = x + 1; i < edgeIndex + 1; i++) {
    const h = grid[y][i];
    const isVisible = h < height;

    numberOfTrees++;
    if (!isVisible) {
      break;
    }
  }

  return numberOfTrees;
};

const numberOfTreesUp = (x: number, y: number, height: number): number => {
  const edgeIndex = 0;

  const isOnTopEdge = y === edgeIndex;
  if (isOnTopEdge) {
    return 0;
  }

  let numberOfTrees = 0;
  for (let i = y - 1; i > edgeIndex - 1; i--) {
    const h = grid[i][x];
    const isVisible = h < height;

    numberOfTrees++;
    if (!isVisible) {
      break;
    }
  }

  return numberOfTrees;
};

const numberOfTreesDown = (x: number, y: number, height: number): number => {
  const edgeIndex = grid.length - 1;

  const isOnBottomEdge = y === edgeIndex;
  if (isOnBottomEdge) {
    return 0;
  }

  let numberOfTrees = 0;
  for (let i = y + 1; i < edgeIndex + 1; i++) {
    const h = grid[i][x];
    const isVisible = h < height;

    numberOfTrees++;
    if (!isVisible) {
      break;
    }
  }

  return numberOfTrees;
};

const numberOfTrees = (x: number, y: number, height: number): number => {
  return (
    numberOfTreesLeft(x, y, height) *
    numberOfTreesRight(x, y, height) *
    numberOfTreesUp(x, y, height) *
    numberOfTreesDown(x, y, height)
  );
};

const scenicScoreGrid = grid.map(
  (row, y) => row.map((height, x) => numberOfTrees(x, y, height)),
  0,
);
const highestScenicScore = Math.max(...scenicScoreGrid.flat());

// console.table(scenicScoreGrid);
console.log({ highestScenicScore });

// console.log(numberOfTreesLeft(2, 1, 5));
// console.log(numberOfTreesRight(2, 1, 5));

// const x = 2;
// const y = 1;
// const height = 5;
// console.log(
//   numberOfTreesUp(x, y, height),
//   numberOfTreesLeft(x, y, height),
//   numberOfTreesRight(x, y, height),
//   numberOfTreesDown(x, y, height),
// );
