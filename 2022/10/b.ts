import { readInputFile } from "../utils";

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

// const input = testInput;
const input = readInputFile(10);

const operations = input
  .split("\n")
  .map(
    operation =>
      operation
        .split(" ")
        .map((value, index) => (index === 1 ? parseInt(value, 10) : value)) as
        | ["addx", number]
        | ["noop", undefined],
  );

const cycleValues: Array<number> = [1];

for (const [operation, value] of operations) {
  const previousValue = cycleValues.at(-1) ?? 1;
  cycleValues.push(previousValue);

  switch (operation) {
    case "addx": {
      cycleValues.push(previousValue + value);
      break;
    }
    case "noop": {
      break;
    }
  }
}

const crt: Array<Array<string>> = [];
let index = 0;

for (const value of cycleValues) {
  if (index === 0) {
    crt.push([]);
  }

  const drawLitPixel =
    value - 1 === index || value === index || value + 1 === index;

  crt.at(-1)!.push(drawLitPixel ? "#" : ".");

  index += 1;
  index %= 40;
}

console.log(crt.map(line => line.join("")).join("\n"))