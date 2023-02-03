import { CheatsheetResult, CHEATSHEETS } from 'src/domain/cheatsheet';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorResult, getAuthors } from 'src/domain/author';
import { TYPE } from '../../src/domain/common';

const cheatsheets: CheatsheetResult[] = [
  ...CHEATSHEETS,
  {
    id: 'howto-og',
    title: 'How To create a Cheatsheet',
    url: '/howto',
    author: 'Cheatsheets Team',
    tags: [],
    type: TYPE.OTHER,
    value: 'How To create a Cheatsheet'
  }
];
const authors = getAuthors(cheatsheets);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<(CheatsheetResult | AuthorResult)[]>
) {
  const query: string = (req.query.q?.toString() || '').toLowerCase();
  const cheatSheetResult = cheatsheets.filter((cheatsheet) =>
    cheatsheet.title.toLowerCase().includes(query)
  );
  const authorResult = authors.filter((author: AuthorResult) =>
    author.name.toLocaleLowerCase().includes(query)
  );

  res.status(200).json([...authorResult, ...cheatSheetResult]);
}
