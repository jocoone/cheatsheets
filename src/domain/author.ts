import { toKebabCase } from 'utils/string';
import { CheatsheetResult } from './cheatsheet';
import { TYPE } from './common';

export type Author = {
  id: string;
  name: string;
};

export type AuthorResult = Author & { id: string; type: TYPE; value: string };

export function getAuthors(cheatsheets: CheatsheetResult[]): AuthorResult[] {
  return getUniqueAuthors(cheatsheets.map(({ author }) => author).filter((author) => !!author));
}

export function getAuthor(id: string, authors: AuthorResult[]): AuthorResult | undefined {
  return authors.find((author) => author.id === id);
}

export function getUniqueAuthors(authors: string[]): AuthorResult[] {
  return Array.from(new Set(authors)).map(mapAuthor);
}

export function mapAuthor(author: string): AuthorResult {
  return {
    id: toKebabCase(author),
    name: author,
    type: TYPE.PEOPLE,
    value: author
  };
}
