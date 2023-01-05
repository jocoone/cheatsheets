import Head from 'next/head';
import Layout from 'src/components/layout';
import { getAuthors } from 'src/domain/author';
import { CHEATSHEETS } from 'src/domain/cheatsheet';
import { AuthorData, getAuthorData } from 'utils/cheatsheet';
import { getFiles } from 'utils/fileread';

import styles from '../../styles/Author.module.scss';

const authors = getAuthors(CHEATSHEETS);

interface PageData {
  id: string;
}

export async function getStaticProps({ params }: { params: PageData }) {
  const authorData = await getAuthorData(params.id);

  return {
    props: {
      authorData
    }
  };
}

export async function getStaticPaths() {
  const paths = authors.map(({ id }) => ({
    params: { id }
  }));

  return { paths, fallback: false };
}

export default function Author({ authorData }: { authorData: AuthorData }) {
  return (
    <>
      <Head>
        <title>{authorData.name}</title>
      </Head>
      <Layout>
        <div>test</div>
        <ul>
          {authorData.posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
