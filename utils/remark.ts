import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

export function parseMatter(contents: string): matter.GrayMatterFile<string> {
  // Use gray-matter to parse the post metadata section
  return matter(contents);
}

function link(h: any, node: any) {
  return h(node, 'a', { href: node.url, target: '_blank noreferrer' }, node.children);
}

function heading(h: any, node: any) {
  const id = node.children
    .filter((child: any) => child.type === 'text')
    .map((child: any) => child.value)
    .map((link: string) => link.split(' ').join('-'))
    .join('-')
    .toLowerCase();
  const a = h(node, 'a', { href: `#${id}`, class: 'internal-link fa-solid fa-link' }, [
    { type: 'text', value: '' }
  ]);
  return h(node, `h${node.depth}`, { id }, [a, ...node.children]);
}

export async function remarkMatter(matterResult: matter.GrayMatterFile<string>): Promise<string> {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, {
      sanitize: false,
      handlers: {
        link,
        heading
      }
    })
    .use(prism, { plugins: ['line-numbers'] })
    .use(remarkGfm)
    .process(matterResult.content);

  return processedContent.toString();
}
