import { CheatsheetResult, CHEATSHEETS } from 'src/domain/cheatsheet';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthorResult, getAuthors } from 'src/domain/author';

const cheatsheets: CheatsheetResult[] = CHEATSHEETS;
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
