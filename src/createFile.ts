import fs from "fs";
import path from "path";
import pino from "pino";
import { nanoid } from "nanoid";

import { ILoggerCreator, ILoggerCreatorOpts } from "./types";
import { loggerOpts, ILoggerOptions } from "./constants";

export const createFile: ILoggerCreator = function createSilent(
  opts?: ILoggerCreatorOpts
) {
  const options: ILoggerOptions = {
    ...opts,
    ...loggerOpts,
  };
  if (!options.name) options.name = nanoid();

  const logFilePath = resolveLogPath(options.name, opts?.destination);
  const dest = pino.destination(logFilePath);

  return pino(options, dest);
};

function resolveLogPath(name: string, destination?: string) {
  const logFilePath = path.resolve(destination || "logs", `${name}.log`);

  const logDirPath = path.dirname(logFilePath);
  if (!fs.existsSync(logDirPath)) fs.mkdirSync(logDirPath, { recursive: true });

  return logFilePath;
}
