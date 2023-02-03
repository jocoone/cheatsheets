import Head from 'next/head';
import Layout from 'src/components/layout';

import styles from '../styles/Notfound.module.scss';

const NotFound = () => (
  <>
    <Head>
      <title>404: Not Found</title>
    </Head>
    <Layout className={styles.content}>
      <h4>
        <span className={styles.enlarge}>404</span>: We are unable to show you the requested page
      </h4>
    </Layout>
  </>
);

export default NotFound;
