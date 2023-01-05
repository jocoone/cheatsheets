import * as fs from 'fs';
import { GrayMatterFile } from 'gray-matter';
import path from 'path';

import { AuthorResult, getAuthor, getUniqueAuthors, mapAuthor } from 'src/domain/author';
import { CheatsheetResult } from 'src/domain/cheatsheet';
import { TYPE } from 'src/domain/common';
import { parseMatter, remarkMatter } from 'utils/remark';
import { getFiles } from './fileread';
import { toKebabCase } from './string';

type Post = {
  id: string;
  title: string;
  author?: AuthorResult;
  date?: string;
  tags?: string;
};

export type PostData = Post & { contentHtml: string };

export type AuthorData = {
  id: string;
  name: string;
  posts: any[];
};

const CHEATSHEETS_DIR = 'cheatsheets';
const cheatsheetFiles = Array.from(getFiles(CHEATSHEETS_DIR)) as string[];
const cheatsheets: Post[] = cheatsheetFiles.map((file: string) => {
  const matterResult = parseMatterFile(file);
  const fileResult = file.replace('.md', '');
  const tags = (matterResult.data.tags || []).split(',').map((tag: string) => tag.trim());
  return {
    id: toKebabCase(fileResult),
    title: matterResult.data.title,
    tags,
    type: TYPE.CHEATSHEET,
    value: matterResult.data.title,
    author: mapAuthor(matterResult.data.author)
  };
});
const authors: AuthorResult[] = getUniqueAuthors(
  cheatsheets.map(({ author }) => author).map((author) => author?.name) as string[]
);

export async function getCheatsheetData(id: string): Promise<PostData> {
  const matterResult = parseMatterFile(`${id}.md`);
  const contentHtml = await remarkMatter(matterResult);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    ...matterResult.data,
    author: mapAuthor(matterResult.data.author),
    date: matterResult.data.date ? matterResult.data.date.toString() : null
  };
}

export async function getPostData(id: string[]) {
  const file = id.join('/');
  return getCheatsheetData(file);
}

export async function getAuthorData(id: string): Promise<AuthorData> {
  const author = getAuthor(id, authors);

  if (!author) return Promise.reject(`${id} author not found`);

  const posts = (
    await Promise.all(
      cheatsheets
        .filter((cheatsheet) => cheatsheet.author?.name === author.name)
        .map(async ({ id }) => await getCheatsheetData(id))
    )
  ).sort(
    (b, a) =>
      (b.date ? new Date(b.date) : new Date()).getDate() -
      (a.date ? new Date(a.date) : new Date()).getDate()
  );

  return { id, name: author.name, posts };
}

export function parseMatterFile(file: string): GrayMatterFile<string> {
  const fullPath = path.join('./cheatsheets', file);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return parseMatter(fileContents);
}
