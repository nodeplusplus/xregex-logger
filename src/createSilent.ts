import { ILoggerCreator } from "./types";

export const createSilent: ILoggerCreator = function createSilent() {
  return {
    fatal: function fatal() {},
    error: function error() {},
    warn: function warn() {},
    info: function info() {},
    debug: function debug() {},
    trace: function trace() {},
  };
};
