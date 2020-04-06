import { LoggerType, ILoggerCreatorOpts } from "./types";

import { createFile } from "./createFile";
import { createConsole } from "./createConsole";
import { createSilent } from "./createSilent";

export function create(type: LoggerType, opts?: ILoggerCreatorOpts) {
  if (type === LoggerType.FILE) return createFile(opts);
  if (type === LoggerType.CONSOLE) return createConsole(opts);
  return createSilent(opts);
}
