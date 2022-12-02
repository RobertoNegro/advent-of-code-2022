import _ from "lodash";
import { getNumberArrayInput } from "../helpers";
import logger from "../logger";

export const reduce = (data) => {
  const result = [];
  let sum = 0;
  _.each(data, (d) => {
    if (d === null) {
      if (sum > 0) {
        result.push(sum);
        sum = 0;
      }
    } else {
      sum += d;
    }
  });
  return result;
};

const execute = async () => {
  logger.info("Day 1");

  let data = await getNumberArrayInput(1, false);
  data = reduce(data);

  const max = _.max(data);
  logger.child({ max }).info("Max");

  const top3 = _.take(_.reverse(_.sortBy(data)), 3);
  logger.child({ top3 }).info("Top 3");

  const top3sum = _.sum(top3);
  logger.child({ top3sum }).info("Top 3 Sum");
};

export default execute;
