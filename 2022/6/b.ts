import { readInputFile } from "../utils";

const testInput1 = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"; // 19
const testInput2 = "bvwbjplbgvbhsrlpgdmjqwftvncz"; // 23

// const input = testInput1;
// const input = testInput2;
const input = readInputFile(6);

const characters = input.split("");
const tracker: Array<string> = [];

const isStartMarker = () => {
  if (tracker.length < 14) {
    return false;
  }

  return new Set(tracker).size === tracker.length;
};

let i = 0;

for (i = 0; i < characters.length; i++) {
  tracker.push(characters[i]);

  if (isStartMarker()) {
    break;
  }

  if (tracker.length > 13) {
    tracker.splice(0, 1);
  }
}

console.log({ tracker, count: i + 1 });
