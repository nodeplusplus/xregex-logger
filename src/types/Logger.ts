export interface ILogger {
  fatal(message: string, ...additionalProps: any[]): void;
  error(message: string, ...additionalProps: any[]): void;
  warn(message: string, ...additionalProps: any[]): void;
  info(message: string, ...additionalProps: any[]): void;
  debug(message: string, ...additionalProps: any[]): void;
  trace(message: string, ...additionalProps: any[]): void;
}

export enum LoggerType {
  SILENT = "silent",
  CONSOLE = "console",
  FILE = "file",
}

export enum LoggerLevel {
  FALTAL = "fatal",
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
  TRACE = "trace",
}

export interface ILoggerCreator {
  (opts?: ILoggerCreatorOpts): ILogger;
}

export interface ILoggerCreatorOpts {
  name?: string;
  level?: LoggerLevel;
  destination?: string;
}
