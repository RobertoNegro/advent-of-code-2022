import _ from "lodash";
import { getInput } from "../helpers";
import logger from "../logger";

enum OpponentChoice {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum YourChoice {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

enum ExpectedResult {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

enum Result {
  Won = 6,
  Draw = 3,
  Lost = 0,
}

export const getResult = (opponent: OpponentChoice, you: YourChoice) => {
  switch (opponent) {
    case OpponentChoice.Rock:
      switch (you) {
        case YourChoice.Rock:
          return Result.Draw;
        case YourChoice.Paper:
          return Result.Won;
        case YourChoice.Scissors:
          return Result.Lost;
        default:
          return Result.Lost;
      }
    case OpponentChoice.Paper:
      switch (you) {
        case YourChoice.Rock:
          return Result.Lost;
        case YourChoice.Paper:
          return Result.Draw;
        case YourChoice.Scissors:
          return Result.Won;
        default:
          return Result.Lost;
      }
    case OpponentChoice.Scissors:
      switch (you) {
        case YourChoice.Rock:
          return Result.Won;
        case YourChoice.Paper:
          return Result.Lost;
        case YourChoice.Scissors:
          return Result.Draw;
        default:
          return Result.Lost;
      }
    default:
      return Result.Lost;
  }
};

export const getScore = (opponent: OpponentChoice, you: YourChoice) => {
  let score = getResult(opponent, you).valueOf();
  switch (you) {
    case YourChoice.Rock:
      score += 1;
      break;
    case YourChoice.Paper:
      score += 2;
      break;
    case YourChoice.Scissors:
      score += 3;
      break;
    default:
      break;
  }
  return score;
};

export const analyzeRow = (row: string) => {
  const [opponent, you] = _.split(row, " ");
  return getScore(opponent, you);
};

export const sanitizeRow = (row: string) => {
  const [opponent, expectedResult] = _.split(row, " ");

  let you;

  switch (opponent) {
    case OpponentChoice.Rock:
      switch (expectedResult) {
        case ExpectedResult.Win:
          you = YourChoice.Paper;
          break;
        case ExpectedResult.Draw:
          you = YourChoice.Rock;
          break;
        case ExpectedResult.Lose:
          you = YourChoice.Scissors;
          break;
        default:
          you = YourChoice.Scissors;
          break;
      }
      break;
    case OpponentChoice.Paper:
      switch (expectedResult) {
        case ExpectedResult.Win:
          you = YourChoice.Scissors;
          break;
        case ExpectedResult.Draw:
          you = YourChoice.Paper;
          break;
        case ExpectedResult.Lose:
          you = YourChoice.Rock;
          break;
        default:
          you = YourChoice.Scissors;
          break;
      }
      break;
    case OpponentChoice.Scissors:
      switch (expectedResult) {
        case ExpectedResult.Win:
          you = YourChoice.Rock;
          break;
        case ExpectedResult.Draw:
          you = YourChoice.Scissors;
          break;
        case ExpectedResult.Lose:
          you = YourChoice.Paper;
          break;
        default:
          you = YourChoice.Scissors;
          break;
      }
      break;
    default:
      you = YourChoice.Scissors;
      break;
  }

  return `${opponent} ${you}`;
};

const execute = async () => {
  logger.info("Day 2");

  const data = await getInput(2, false);

  logger.child({ data }).info("Data");

  let score = 0;
  _.each(data, (row) => {
    score += analyzeRow(sanitizeRow(row));
  });

  logger.child({ score }).info("Total score");
};

export default execute;
