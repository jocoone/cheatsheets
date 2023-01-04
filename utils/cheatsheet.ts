import * as fs from 'fs';
import { GrayMatterFile } from 'gray-matter';
import path from 'path';
import { parseMatter, remarkMatter } from 'utils/remark';

const CHEATSHEETS_DIR = './cheatsheets';

export type PostData = {
  id: string;
  contentHtml: string;
  title: string;
  author?: string;
  date?: string;
  tags?: string;
};

export async function getPostData(id: string[]): Promise<PostData> {
  const file = id.join('/');
  const matterResult = parseMatterFile(`${file}.md`);
  const contentHtml = await remarkMatter(matterResult);

  // Combine the data with the id and contentHtml
  return {
    id: file,
    contentHtml,
    title: matterResult.data.title,
    ...matterResult.data,
    date: matterResult.data.date ? matterResult.data.date.toString() : null
  };
}

export function parseMatterFile(file: string): GrayMatterFile<string> {
  const fullPath = path.join(CHEATSHEETS_DIR, file);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return parseMatter(fileContents);
}
