import faker from "faker";

import { LoggerLevel } from "../../src/types";
import { createSilent } from "../../src/createSilent";
import { interceptConsole } from "../../mocks/helper";

describe("createSilent", () => {
  const message = faker.lorem.words();

  it("should show message to console", async () => {
    const intercept = interceptConsole();
    const generateOutput = intercept();

    const logger = createSilent();

    Object.values(LoggerLevel).forEach((level) => logger[level](message));

    const output = generateOutput();
    expect(output).toBeFalsy();
  });
});
