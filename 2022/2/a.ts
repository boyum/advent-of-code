import { readInputFile } from "../utils";

const oRock = "A";
const oPaper = "B";
const oScissors = "C";

const mRock = "X";
const mPaper = "Y";
const mScissors = "Z";

const loseScore = 0;
const drawScore = 3;
const winScore = 6;

const input = readInputFile(2);
const rounds = input.split("\n");

const wins = [`${oRock} ${mPaper}`, `${oPaper} ${mScissors}`, `${oScissors} ${mRock}`];
const draws = [`${oRock} ${mRock}`, `${oPaper} ${mPaper}`, `${oScissors} ${mScissors}`];

const moveScores = {
  [mRock]: 1,
  [mPaper]: 2,
  [mScissors]: 3,
}

const score = rounds.reduce((accumulatedScore, round) => {
  const [oMove, mMove] = round.split(" ") as ["A"|"B"|"C", "X"|"Y"|"Z"];
  
  const isWin = wins.includes(round);
  const isDraw = draws.includes(round);

  const moveScore = moveScores[mMove];

  const outcomeScore = isWin ? winScore : isDraw ? drawScore : loseScore;
  
  return accumulatedScore + moveScore + outcomeScore
}, 0);

console.log({score})