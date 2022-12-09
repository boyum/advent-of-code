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

const canLookLeft = (x: number, y: number, height: number): boolean => {
  const edgeIndex = 0;
  const isOnLeftmostEdge = x === edgeIndex;

  if (x === 3 && y === 1) {
    console.log({ isOnLeftmostEdge });
  }

  if (isOnLeftmostEdge) {
    return true;
  }

  for (let i = edgeIndex; i < x; i++) {
    const h = grid[y][i];
    const isVisible = h < height;

    if (!isVisible) {
      return false;
    }
  }
  if (x === 3 && y === 1) {
    console.log({ isVisible: true });
  }

  return true;
};

const canLookRight = (x: number, y: number, height: number): boolean => {
  const edgeIndex = grid[0].length - 1;
  const isOnRightmostEdge = x === edgeIndex;
  if (x === 3 && y === 1) {
    console.log({ isOnRightmostEdge });
  }
  if (isOnRightmostEdge) {
    return true;
  }

  for (let i = x + 1; i < edgeIndex + 1; i++) {
    const h = grid[y][i];
    const isVisible = h < height;

    if (!isVisible) {
      return false;
    }
  }
  if (x === 3 && y === 1) {
    console.log({ isVisible: true });
  }

  return true;
};

const canLookUp = (x: number, y: number, height: number): boolean => {
  const edgeIndex = 0;
  const isOnTopEdge = y === edgeIndex;
  if (x === 3 && y === 1) {
    console.log({ isOnTopEdge });
  }
  if (isOnTopEdge) {
    return true;
  }

  for (let i = edgeIndex; i < y; i++) {
    const h = grid[i][x];
    const isVisible = h < height;

    if (!isVisible) {
      return false;
    }
  }
  if (x === 3 && y === 1) {
    console.log({ isVisible: true });
  }

  return true;
};

const canLookDown = (x: number, y: number, height: number): boolean => {
  const edgeIndex = grid.length - 1;
  const isOnBottomEdge = y === edgeIndex;
  if (x === 3 && y === 1) {
    console.log({ isOnBottomEdge });
  }
  if (isOnBottomEdge) {
    return true;
  }

  for (let i = y + 1; i < edgeIndex + 1; i++) {
    const h = grid[i][x];
    const isVisible = h < height;

    if (!isVisible) {
      return false;
    }
  }
  if (x === 3 && y === 1) {
    console.log({ isVisible: true });
  }

  return true;
};

const isVisible = (x: number, y: number, height: number): boolean => {
  return (
    canLookLeft(x, y, height) ||
    canLookRight(x, y, height) ||
    canLookUp(x, y, height) ||
    canLookDown(x, y, height)
  );
};

const visibilityGrid = grid.map(
  (row, y) => row.map((height, x) => isVisible(x, y, height)),
  0,
);

const visibleTrees = visibilityGrid
  .flat()
  .reduce((acc, isVisible) => acc + (isVisible ? 1 : 0), 0);

console.table(visibilityGrid);
console.log({ visibleTrees });
