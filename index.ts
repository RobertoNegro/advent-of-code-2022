import minimist from "minimist";
import * as dotenv from "dotenv";
import main from "./src/main";
import logger from "./src/logger";

dotenv.config();

main(minimist(process.argv.slice(2))).catch((e) => {
  // eslint-disable-next-line no-console
  console.error("App exited with error: ", e);
  logger.child({ error: e }).error("App exited with error");
});
