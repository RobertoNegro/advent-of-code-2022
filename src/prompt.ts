import nodePrompt from "prompt";
import _ from "lodash";
import * as fs from "fs";

nodePrompt.start({
  stdout: fs.createWriteStream("/dev/null"),
});

export type PromptType = "boolean" | "string" | "number" | "json";

export class InvalidPromptError<T> extends Error {
  invalidPrompt;

  constructor(message: string, prompt: T) {
    super(message);
    this.invalidPrompt = prompt;
  }
}

export const convertToType = (value: string, type: PromptType) => {
  switch (type) {
    case "string":
      return value;
    case "number":
      return parseInt(value, 10);
    case "boolean":
      try {
        return _.isEmpty(value) ? false : !!JSON.parse(value);
      } catch {
        // there is something even if it's not json parseable
        return true;
      }
    case "json": {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }
    default:
      return value;
  }
};

export interface PromptConfig<T> {
  type: PromptType;
  validator?: (value: T) => true | string;
}

const prompt: <T>(config?: Partial<PromptConfig<T>>) => Promise<T> = async <T>(
  config
) => {
  const { validator, type }: PromptConfig<T> = {
    ...{ type: "string" },
    ...(config ?? {}),
  };

  return new Promise<T>((resolve, reject) => {
    nodePrompt.get("value", (err, { value }) => {
      const convertedValue = convertToType(value, type) as T;
      if (!validator) {
        return resolve(convertedValue);
      }
      const validationResults = validator(convertedValue);
      if (validationResults === true) {
        return resolve(convertedValue);
      }

      return reject(new InvalidPromptError(validationResults, value));
    });
  });
};

export default prompt;
