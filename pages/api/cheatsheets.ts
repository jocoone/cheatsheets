import { Cheatsheet } from "src/domain/cheatsheet";
import type { NextApiRequest, NextApiResponse } from "next";
import { getFiles } from "utils/fileread";
import { parseMatterFile } from "utils/cheatsheet";
import { toKebabCase } from "utils/string";

const CHEATSHEETS_DIR = "cheatsheets";
const cheatsheetFiles = Array.from(getFiles(CHEATSHEETS_DIR)) as string[];
const cheatsheets: Cheatsheet[] = cheatsheetFiles.map((file: string) => {
  const matterResult = parseMatterFile(file);
  const fileResult = file.replace(".md", "");
  const tags = (matterResult.data.tags || []).split(",").map((tag: string) => tag.trim());
  return {
    id: toKebabCase(fileResult),
    title: matterResult.data.title,
    url: `/${CHEATSHEETS_DIR}/${fileResult}`,
    tags
  };
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cheatsheet[]>
) {
  const query: string = (req.query.q?.toString() || "").toLowerCase();
  const result = cheatsheets.filter((cheatsheet) =>
    cheatsheet.title.toLowerCase().includes(query)
  );
  res.status(200).json(result);
}
