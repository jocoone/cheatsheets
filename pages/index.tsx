import Layout from 'src/components/layout';

import styles from '../styles/Home.module.scss';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout full={true}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Start sharing your knowledge</h1>
            <p>It is good to have a lot of knowledge. It is even better to share it with others.</p>
            <div className={styles.buttons}>
              <a href="/howto" className="button primary">
                Start sharing
              </a>
              <a href="/search" className="button secondary">
                Search
              </a>
            </div>
          </div>
          <div className={styles.picture}>
            <img src="/pic.png" alt="pic" />
          </div>
        </div>
      </Layout>
    </>
  );
}
