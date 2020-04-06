import fs from "fs";
import path from "path";
import faker from "faker";

import { createFile } from "../../src/createFile";
import { validateFile } from "../../mocks/helper";

describe("createFile", () => {
  const level = "info";
  const message = faker.lorem.words();

  beforeAll(() => {
    fs.rmdirSync(path.resolve(__dirname, "../../logs"), { recursive: true });
  });

  it("should write log to DEFAULT log folder", async () => {
    const logger = createFile();
    logger[level](message);

    const bindings = (logger as any).bindings();
    const logFilePath = path.resolve(
      __dirname,
      "../../logs",
      `${bindings.name}.log`
    );

    function validateMessageFn(msg: { [name: string]: any }) {
      expect(msg.level).toBe(level);
      expect(msg.message).toBe(message);
      expect(msg.time).toBeTruthy();

      expect(msg.name).toBe(bindings.name);
    }

    await validateFile(logFilePath, validateMessageFn);
  });

  it("should write log to CUSTOM log folder with additional object", async () => {
    const name = faker.internet.domainName();

    const logFilePath = path.resolve(__dirname, "../../logs", `${name}.log`);

    const logger = createFile({ name, destination: path.dirname(logFilePath) });
    const additionalObj = { id: faker.random.uuid() };
    logger[level](message, additionalObj);

    function validateMessageFn(msg: { [name: string]: any }) {
      expect(msg.level).toBe(level);
      expect(msg.message).toBe(message);
      expect(msg.time).toBeTruthy();

      expect(msg.name).toBe(name);
      expect(msg.id).toBe(additionalObj.id);
    }

    await validateFile(logFilePath, validateMessageFn);
  });
});
