import pino, { LoggerOptions, LogFn } from "pino";

export const loggerOpts: ILoggerOptions = {
  messageKey: "message",
  timestamp: pino.stdTimeFunctions.isoTime,
  hooks: {
    logMethod(inputArgs: any[], method: LogFn) {
      if (inputArgs.length >= 2) {
        const arg1 = inputArgs.shift();
        const arg2 = inputArgs.shift();
        return method.apply(this, [
          Object.assign({}, arg2, ...inputArgs),
          arg1,
        ]);
      }
      return method.apply(this, inputArgs as any);
    },
  },
  formatters: {
    level(label: string) {
      return { level: label };
    },
    bindings(bindings: { name: string; pid: number; hostname: string }) {
      return { name: bindings.name };
    },
  },
};

export interface ILoggerOptions extends LoggerOptions {
  hooks?: {
    logMethod?(inputArgs: any[], method: LogFn): void;
  };
  formatters?: {
    level(label: string, number: number): { level: string | number };
    bindings(bindings: {
      name: string;
      pid: number;
      hostname: string;
    }): { [name: string]: any };
  };
}
