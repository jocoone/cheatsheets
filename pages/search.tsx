import Layout from 'src/components/layout';
import { Cheatsheet } from 'src/domain/cheatsheet';
import { useEffect, useState } from 'react';

import styles from '../styles/Search.module.scss';
import Logo from 'src/components/logo';
import Head from 'next/head';
import Search from 'src/components/search';
import { TYPE } from 'src/domain/common';
import { Author } from 'src/domain/author';

export function select([option]: any[]) {
  if (option) {
    switch (option.type) {
      case TYPE.CHEATSHEET:
        const cheatsheet = option as Cheatsheet;
        location.href = cheatsheet.url;
        break;
      case TYPE.PEOPLE:
        const author = option as Author;
        location.href = `/authors/${author.id}`;
        break;
    }
  }
}

export default function Home() {
  const [showTypeahead, setShowTypeahead] = useState(false);

  useEffect(() => setShowTypeahead(true));

  if (!showTypeahead) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Cheatsheets</title>
      </Head>
      <Layout>
        <div className={styles.content}>
          <div className={styles.header}>
            <Logo className={styles.logo} />
          </div>
          <Search className={styles.search} select={select} />
        </div>
      </Layout>
    </>
  );
}
