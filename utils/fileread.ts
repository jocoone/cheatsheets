import fs from "fs";
import path from "path";

export function* getFiles(directory: string): any {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  for (const file of files) {
    const resolution = path.join(directory, file.name);
    if (file.isDirectory()) {
      yield* getFiles(resolution);
    } else {
      yield resolution.replace("cheatsheets/", "");
    }
  }
}
