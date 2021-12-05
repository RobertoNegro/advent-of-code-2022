import pino from "pino";
import pinoPretty from "pino-pretty";
import format from "date-fns/format";

const logPath = `${__dirname}/../logs/${format(new Date(), "dd-MM-yyyy")}.log`;

const logger = pino(
  {},
  pino.multistream([
    {
      stream: pinoPretty({
        colorize: true,
      }),
    },
    {
      stream: pino.destination(logPath),
    },
  ])
);

export default logger;
