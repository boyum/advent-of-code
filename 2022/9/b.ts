import { readInputFile } from "../utils";

const testInput1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

// const input = testInput1;
// const input = testInput2;
const input = readInputFile(9);

const motions = input.split("\n");

type Position = [number, number];
type Direction = "U" | "D" | "R" | "L";

const getDistances = ([aX, aY]: Position, [bX, bY]: Position): Position => {
  return [bX - aX, bY - aY];
};

const getIsTouching = (distances: Position): boolean => {
  return distances.every(distance => Math.abs(distance) < 2);
};

const move1 = (position: Position, direction: Direction): void => {
  switch (direction) {
    case "L":
      position[0]--;
      break;
    case "R":
      position[0]++;
      break;
    case "U":
      position[1]--;
      break;
    case "D":
      position[1]++;
      break;
  }
};

const hasVisited = (
  visitedTailPositions: Array<Position>,
  [aX, aY]: Position,
): boolean => {
  return !!visitedTailPositions.find(([bX, bY]) => aX === bX && aY === bY);
};

const headPosition: Position = [0, 0];
const knotPositions: Array<Position> = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const visitedTailPositions: Array<Position> = [[0, 0]];

motions.forEach(motion => {
  const [direction, length] = motion.split(" ");

  for (let i = 0; i < parseInt(length, 10); i++) {
    move1(headPosition, direction as Direction);

    for (let j = 0; j < knotPositions.length; j++) {
      const h: Position = j === 0 ? headPosition : knotPositions[j - 1];
      const t: Position = knotPositions[j];

      const distances = getDistances(h, t);
      const isTouching = getIsTouching(distances);

      const shouldMove = !isTouching;
      if (shouldMove) {
        t[0] += distances[0] < 0 ? 1 : distances[0] > 0 ? -1 : 0;
        t[1] += distances[1] < 0 ? 1 : distances[1] > 0 ? -1 : 0;

        const isTail = j === knotPositions.length - 1;
        if (isTail) {
          if (!hasVisited(visitedTailPositions, t)) {
            visitedTailPositions.push([...t]);
          }
        }
      }
    }
  }
});

console.log(visitedTailPositions.length);
