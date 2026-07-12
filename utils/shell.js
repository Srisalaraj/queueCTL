import { exec } from "child_process";

export const executeCommand = (command) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({
          success: false,
          output: stderr || error.message,
        });

        return;
      }

      resolve({
        success: true,
        output: stdout.trim(),
      });
    });
  });
};
