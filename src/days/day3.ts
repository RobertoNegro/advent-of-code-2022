import _ from "lodash";
import { getInput } from "../helpers";
import logger from "../logger";

export const splitCompartments = (rucksack: string) => {
  return [
    rucksack.substring(0, rucksack.length / 2),
    rucksack.substring(rucksack.length / 2),
  ];
};

export const getSharedType = (...compartments: string[]) => {
  return _.intersection(..._.map(compartments, (c) => _.uniq(_.split(c, ""))));
};

export const getPriority = (c: string) => {
  if (c.length !== 1) {
    throw new Error("Only one character is allowed in getPriority");
  }

  const a = "a".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const A = "A".charCodeAt(0);

  const current = c.charCodeAt(0);

  return current - (current > Z ? a : A) + (current > Z ? 1 : 27);
};

export const getTotalPriority = (data: string[]) => {
  let priorities = 0;
  _.each(data, (row) => {
    priorities += _.sum(
      _.map(getSharedType(...splitCompartments(row)), (c) => getPriority(c))
    );
  });
  return priorities;
};

export const getTotalGroupPriority = (data: string[]) => {
  let priorities = 0;
  for (let i = 0; i <= data.length - 3; i += 3) {
    priorities += _.sum(
      _.map(getSharedType(..._.slice(data, i, i + 3)), (c) => getPriority(c))
    );
  }
  return priorities;
};

const execute = async () => {
  logger.info("Day 3");

  const data = await getInput(3, false);

  logger.child({ priorities: getTotalPriority(data) }).info("Total priorities");

  logger
    .child({ priorities: getTotalGroupPriority(data) })
    .info("Total priorities by group");
};

export default execute;
