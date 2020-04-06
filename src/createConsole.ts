import pino from "pino";
import { nanoid } from "nanoid";

import { ILoggerCreator, ILoggerCreatorOpts } from "./types";
import { loggerOpts, ILoggerOptions } from "./constants";

export const createConsole: ILoggerCreator = function createSilent(
  opts?: ILoggerCreatorOpts
) {
  const options: ILoggerOptions = {
    ...opts,
    ...loggerOpts,
  };
  if (!options.name) options.name = nanoid();

  return pino(options);
};
