import faker from "faker";

import { createConsole } from "../../src/createConsole";
import { interceptConsole } from "../../mocks/helper";

describe("createConsole", () => {
  const level = "info";
  const message = faker.lorem.words();

  it("should show message to console", async () => {
    const intercept = interceptConsole();
    const generateOutput = intercept();

    const logger = createConsole();
    const bindings = (logger as any).bindings();
    logger[level](message);

    const output = generateOutput();
    expect(output).toBeTruthy();

    const msg = JSON.parse(output);
    expect(msg.level).toBe(level);
    expect(msg.message).toBe(message);
    expect(msg.time).toBeTruthy();

    expect(msg.name).toBe(bindings.name);
  });

  it("should show message to console with additional object", async () => {
    const intercept = interceptConsole();
    const generateOutput = intercept();

    const name = faker.internet.domainName();
    const additionalObj = { id: faker.random.uuid() };

    const logger = createConsole({ name });
    logger[level](message, additionalObj);

    const output = generateOutput();
    expect(output).toBeTruthy();

    const msg = JSON.parse(output);
    expect(msg.level).toBe(level);
    expect(msg.message).toBe(message);
    expect(msg.time).toBeTruthy();

    expect(msg.name).toBe(name);
    expect(msg.id).toBe(additionalObj.id);
  });
});
