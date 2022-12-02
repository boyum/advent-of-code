import { readInputFile } from "../utils";

const oRock = "A";
const oPaper = "B";
const oScissors = "C";

const loseScore = 0;
const drawScore = 3;
const winScore = 6;

const input = readInputFile(2);
const rounds = input.split("\n");

const moveScores = {
  ["rock"]: 1,
  ["paper"]: 2,
  ["scissors"]: 3,
};

const winMoves = {
  [oRock]: "paper",
  [oPaper]: "scissors",
  [oScissors]: "rock",
} as const;

const drawMoves = {
  [oRock]: "rock",
  [oPaper]: "paper",
  [oScissors]: "scissors",
} as const;

const loseMoves = {
  [oRock]: "scissors",
  [oPaper]: "rock",
  [oScissors]: "paper",
} as const;

const getMove = (
  opponentMove: "A" | "B" | "C",
  outcome: "X" | "Y" | "Z",
): "rock" | "paper" | "scissors" => {
  const isWin = outcome === "Z";
  const isDraw = outcome === "Y";

  return isWin
    ? winMoves[opponentMove]
    : isDraw
    ? drawMoves[opponentMove]
    : loseMoves[opponentMove];
};

const score = rounds.reduce((accumulatedScore, round) => {
  const [oMove, outcome] = round.split(" ") as [
    "A" | "B" | "C",
    "X" | "Y" | "Z",
  ];

  const isWin = outcome === "Z";
  const isDraw = outcome === "Y";

  const mMove = getMove(oMove, outcome);
  const moveScore = moveScores[mMove];

  const outcomeScore = isWin ? winScore : isDraw ? drawScore : loseScore;

  console.log({moveScore, outcomeScore, oMove, mMove, round})
  
  return accumulatedScore + moveScore + outcomeScore;
}, 0);

console.log({ score });
