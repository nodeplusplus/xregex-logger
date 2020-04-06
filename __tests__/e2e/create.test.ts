import faker from "faker";

import { LoggerType, LoggerLevel } from "../../src/types";
import { create } from "../../src/create";

describe("create", () => {
  const name = faker.internet.domainName();

  it("should return file logger successfully", () => {
    const logger = create(LoggerType.FILE, { name });

    expect(logger).toBeTruthy();
    Object.values(LoggerLevel).forEach((level) =>
      expect(logger[level]).toBeTruthy()
    );
  });

  it("should return console logger successfully", () => {
    const logger = create(LoggerType.CONSOLE, { name });

    expect(logger).toBeTruthy();
    Object.values(LoggerLevel).forEach((level) =>
      expect(logger[level]).toBeTruthy()
    );
  });

  it("should return silent logger as well", () => {
    const logger = create(LoggerType.SILENT);

    expect(logger).toBeTruthy();
    Object.values(LoggerLevel).forEach((level) =>
      expect(logger[level]).toBeTruthy()
    );
  });
});
