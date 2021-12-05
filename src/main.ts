import { getDate, getMonth } from "date-fns";
import logger from "./logger";
import prompt, { InvalidPromptError } from "./prompt";

export const validateChoice = (referenceDate, choice) =>
  typeof choice !== "number" || choice <= 0 || Number.isNaN(choice)
    ? `Type a valid number`
    : getMonth(referenceDate) === 11
    ? choice > 0 && choice <= getDate(referenceDate)
      ? true
      : `Type a value from 1 to ${getDate(referenceDate)}`
    : choice > 0 && choice <= 31
    ? true
    : "Type a value from 1 to 31";

export const formatOrdinals = (n) => {
  if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
    throw RangeError("n should be a number >= 0");
  }

  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });

  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

const main = async (args) => {
  let choice = args._[0];
  if (!choice) {
    do {
      logger.info(`Type the day of the advent-of-code that you desire:`);
      logger.flush();

      try {
        // eslint-disable-next-line no-await-in-loop
        choice = await prompt<number>({
          validator: (value) => validateChoice(new Date(), value),
          type: "number",
        });
      } catch (e) {
        if (e instanceof InvalidPromptError) {
          choice = null;
          logger.child({ prompt: e.invalidPrompt }).error(e.message);
        } else {
          throw e;
        }
      }

      // eslint-disable-next-line no-await-in-loop
      // choice = await prompts({
      //   type: "number",
      //   name: "value",
      //   message: "Type the day of the advent-of-code that you desire:",
      //   validate: (value) => validateChoice(new Date(), value),
      // });
    } while (!choice);
  }

  logger.info(`Ok, running the ${formatOrdinals(choice)} day...`);

  const execute = (await import(`./days/day${choice}`)).default;
  await execute();
};

export default main;
