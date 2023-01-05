import { parseMatterFile } from 'utils/cheatsheet';
import { getFiles } from 'utils/fileread';
import { toKebabCase } from 'utils/string';
import { TYPE } from './common';

export type Cheatsheet = {
  id: string;
  title: string;
  url: string;
  author: string;
  tags: string[];
};

export type CheatsheetResult = Cheatsheet & { type: TYPE; value: string };

const CHEATSHEETS_DIR = 'cheatsheets';
export const cheatsheetFiles = Array.from(getFiles(CHEATSHEETS_DIR)) as string[];

export const CHEATSHEETS: CheatsheetResult[] = cheatsheetFiles.map((file: string) => {
  const matterResult = parseMatterFile(file);
  const fileResult = file.replace('.md', '');
  const tags = (matterResult.data.tags || []).split(',').map((tag: string) => tag.trim());
  return {
    id: toKebabCase(fileResult),
    title: matterResult.data.title,
    url: `/${CHEATSHEETS_DIR}/${fileResult}`,
    tags,
    type: TYPE.CHEATSHEET,
    value: matterResult.data.title,
    author: matterResult.data.author
  };
});
