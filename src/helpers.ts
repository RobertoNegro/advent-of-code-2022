import _ from "lodash";
import axios, { AxiosResponse } from "axios";
import logger from "./logger";

export class StatusError extends Error {
  status;

  data;

  constructor(message: string, response: AxiosResponse) {
    super(message);
    this.status = response.status;
    this.data = response.data;
  }
}

export const getInput = async (day: number, debug?: boolean) => {
  let input: AxiosResponse | undefined;
  try {
    input = await axios.get(`https://adventofcode.com/2022/day/${day}/input`, {
      headers: {
        Cookie: `session=${process.env.SESSION_COOKIE}`,
      },
    });
  } catch (e) {
    if (debug) {
      if (axios.isAxiosError(e)) {
        logger.error(
          `Request for getting input of day ${day} errored:`,
          "status",
          _.get(e, "response.status", "N.A."),
          "data:",
          _.get(e, "response.data", "N.A.")
        );
      } else {
        logger.error(`Request for getting input of day ${day} errored:`, e);
      }
    }
    throw e;
  }

  if (input.status < 200 && input.status >= 300) {
    throw new StatusError("Invalid HTTP status", input);
  }

  if (input && input.status >= 200 && input.status < 300 && input.data) {
    let res = _.split(input.data, "\n");
    res = _.map(res, (d) => _.trim(d));
    while (res[0].length === 0) {
      res = _.slice(res, 1);
    }
    while (res[res.length - 1].length === 0) {
      res = _.slice(res, 0, -1);
    }
    return res;
  }
  return [];
};

export const getNumberArrayInput = async (day: number, debug?: boolean) => {
  const input = await getInput(day, debug);
  return _.map(input, (d) => {
    let parsed = parseInt(d, 10);
    if (_.isNaN(parsed)) {
      parsed = null;
    }
    return parsed;
  });
};

export default {
  getInput,
  getNumberArrayInput,
};
