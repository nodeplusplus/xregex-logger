import fs from "fs";

export function validateFile(logFilePath: string, validateMessageFn: Function) {
  return new Promise((resolve, reject) => {
    let round = 10;

    const interval = setInterval(() => {
      if (round <= 0) return reject(new Error(`FAILED: ${logFilePath}`));

      --round;
      if (!fs.existsSync(logFilePath)) return;

      // Check data of file
      const logMessages = fs.readFileSync(logFilePath, "utf8");
      const messages = logMessages
        .split("\n")
        .filter(Boolean)
        .map((message) => JSON.parse(message));

      expect(messages.length).toBeGreaterThanOrEqual(1);
      for (let message of messages) {
        validateMessageFn(message);
      }

      clearInterval(interval);
      resolve(messages);
    }, 500);
  });
}

export function interceptConsole() {
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);

  let activeIntercept = false;
  let taskOutput: string = "";
  return () => {
    if (activeIntercept) {
      throw new Error(
        "Unexpected initilization of multiple concurrent stdout interceptors."
      );
    }

    // $FlowFixMe
    (process.stdout as any).write = (
      chunk: any,
      encoding: any,
      callback: any
    ) => {
      if (activeIntercept && typeof chunk === "string") {
        taskOutput += chunk;
        return;
      }

      return originalStdoutWrite(chunk, encoding, callback);
    };

    activeIntercept = true;

    return (): string => {
      const result = taskOutput;

      activeIntercept = false;
      taskOutput = "";

      return result;
    };
  };
}
