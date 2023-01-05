import Layout from 'src/components/layout';
import Head from 'next/head';
import { format } from 'date-fns';
import { getPostData, PostData } from '../../utils/cheatsheet';

import styles from '../../styles/Cheatsheet.module.scss';
import { cheatsheetFiles } from 'src/domain/cheatsheet';

interface PageData {
  id: string[];
}

export async function getStaticProps({ params }: { params: PageData }) {
  const postData = await getPostData(params.id);
  const tags = (postData.tags || '').split(',').map((tag: string) => tag.trim());

  return {
    props: {
      postData,
      tags
    }
  };
}

export async function getStaticPaths() {
  const posts = cheatsheetFiles.map((file: string) => file.split('.')[0]);

  const paths = posts.map((post) => ({
    params: { id: post.split('/') }
  }));

  return { paths, fallback: false };
}

export default function CheatSheet({ postData, tags }: { postData: PostData; tags: string[] }) {
  const initials = (postData.author?.name || '')
    .split(' ')
    .slice(0, 2)
    .map((words: string) => words.charAt(0));
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Layout>
        <div className={styles.author}>
          <div className={styles.initials}>{initials}</div>
          <div className={styles.content}>
            <a href={`/authors/${postData.author?.id}`} className={styles.name}>
              {postData.author?.name}
            </a>
            {postData.date && (
              <div className={styles.date}>{format(new Date(postData.date), 'MMMM do, yyyy')}</div>
            )}
          </div>
        </div>
        <h1 className={styles.cheatsheettitle}>{postData.title}</h1>
        <div className={styles.tags}>
          {(tags || []).map((tag: string, index: number) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div
          className={styles.cheatsheetcontent}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </Layout>
    </>
  );
}
