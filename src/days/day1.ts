import { getNumberArrayInput } from "../helpers";
import logger from "../logger";

const execute = async () => {
  logger.info("Day 1");
  const data = await getNumberArrayInput(1, false);

  logger.child(data).info("Data");
};

export default execute;
