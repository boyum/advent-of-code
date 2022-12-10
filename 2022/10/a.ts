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

const cycleValues: Array<number> = [];

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

const c20 = cycleValues[18] * 20;
const c60 = cycleValues[58] * 60;
const c100 = cycleValues[98] * 100;
const c140 = cycleValues[138] * 140;
const c180 = cycleValues[178] * 180;
const c220 = cycleValues[218] * 220;

console.log("sum", c20 + c60 + c100 + c140 + c180 + c220);



console.log(cycleValues[18], cycleValues[18] * 20)
console.log(cycleValues[58], cycleValues[58] * 60)
console.log(cycleValues[98], cycleValues[98] * 100)
console.log(cycleValues[138], cycleValues[138] * 140)
console.log(cycleValues[178], cycleValues[178] * 180)
console.log(cycleValues[218], cycleValues[218] * 220)

// console.log(cycleValues[20])
// console.log(cycleValues[60])
// console.log(cycleValues[100])
// console.log(cycleValues[140])
// console.log(cycleValues[180])
// console.log(cycleValues[220])
