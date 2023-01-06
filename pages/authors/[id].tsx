import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import Head from 'next/head';
import Layout from 'src/components/layout';
import Tag from 'src/components/tag';
import { getAuthors } from 'src/domain/author';
import { CHEATSHEETS } from 'src/domain/cheatsheet';
import { AuthorData, getAuthorData } from 'utils/cheatsheet';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import styles from '../../styles/Author.module.scss';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

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
  const author = authorData;
  const initials = (author.name || '')
    .split(' ')
    .slice(0, 2)
    .map((words: string) => words.charAt(0));

  return (
    <>
      <Head>
        <title>{authorData.name}</title>
      </Head>
      <Layout>
        <main className={styles.main}>
          <article>
            <h1>{author.name}</h1>
            <h5>Posts</h5>
            <ul>
              {author.posts.map((post) => (
                <li key={post.id}>
                  <div className={styles.date}>{format(new Date(post.date), 'MMM do, yyyy')}</div>
                  <h2>
                    <a href={post.url}>{post.title}</a>
                  </h2>
                  <div className={styles.description}>{post.description}</div>
                  <div className={styles.tags}>
                    {(post.tags || []).map((tag: string, index: number) => (
                      <Tag key={index} tag={tag} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <aside>
            <div className={styles.initials}>{initials}</div>
            <b>{author.name}</b>
            {author.description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: author.description }}
              ></div>
            )}
            <div className={styles.socials}>
              {author.email && (
                <a href={`mailto:${author.email}`}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              )}
              {author.twitter && (
                <a target="_blank" href={`https://twitter.com/${author.twitter}`}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              )}
            </div>
          </aside>
        </main>
      </Layout>
    </>
  );
}
