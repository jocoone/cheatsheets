import Layout from 'src/components/layout';
import { Cheatsheet } from 'src/domain/cheatsheet';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.scss';
import Logo from 'src/components/logo';
import Head from 'next/head';
import Search from 'src/components/search';
import { TYPE } from 'src/domain/common';
import { Author } from 'src/domain/author';

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
