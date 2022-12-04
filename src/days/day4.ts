import _ from "lodash";
import { getInput } from "../helpers";
import logger from "../logger";

export const splitPairs = (row: string) => _.split(row, ",");

export const splitSections = (pair: string) =>
  _.map(_.split(pair, "-"), (s) => parseInt(s, 10));

export const getOverlaps = (a: number[], b: number[]) => {
  const start = _.max([a[0], b[0]]);
  const end = _.min([a[1], b[1]]);
  if (start > end) {
    return false;
  }
  return [start, end];
};

export const getRange = (start: number, end: number) => end - start + 1;

export const isCompletelyOverlapped = (a: number[], b: number[]) => {
  const overlaps = getOverlaps(a, b);

  if (!overlaps) {
    return false;
  }

  return (
    getRange(overlaps[0], overlaps[1]) ===
    _.min([getRange(a[0], a[1]), getRange(b[0], b[1])])
  );
};

export const isOverlapped = (a: number[], b: number[]) => {
  return !!getOverlaps(a, b);
};

export const analyzeOverlaps = (data: string[]) => {
  let overlapped = 0;
  _.each(data, (row) => {
    const [a, b] = _.map(splitPairs(row), (p) => splitSections(p));
    if (isCompletelyOverlapped(a, b)) {
      overlapped += 1;
    }
  });
  return overlapped;
};

export const analyzePartialOverlaps = (data: string[]) => {
  let overlapped = 0;
  _.each(data, (row) => {
    const [a, b] = _.map(splitPairs(row), (p) => splitSections(p));
    if (isOverlapped(a, b)) {
      overlapped += 1;
    }
  });
  return overlapped;
};

const execute = async () => {
  logger.info("Day 4");

  const data = await getInput(4, false);

  logger.child({ overlaps: analyzeOverlaps(data) }).info("Total overlaps");

  logger
    .child({ overlaps: analyzePartialOverlaps(data) })
    .info("Partial overlaps");
};

export default execute;
