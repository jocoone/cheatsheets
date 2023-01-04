import Head from 'next/head';
import Layout from 'src/components/layout';
import Logo from 'src/components/logo';

import styles from '../styles/HowTo.module.scss';

const HowTo = () => (
  <>
    <Head>
      <title>Cheatsheets</title>
    </Head>
    <Layout className={styles.content}>
      <h1 className={styles.title}>How to create a cheatsheet?</h1>
      <h2>About</h2>
      <p>
        We all are using opensource software and tools on a daily basis. No better way to make our
        work more comfortable and easier. A lot of those tools require a lot of reading and
        understanding on how everything works. We combine official documentation with information
        written down in blogposts and maybe even use answers from questions and problems on{' '}
        <a href="stackoverflow.com" target="_blank" rel="noreferrer">
          stackoverflow
        </a>
        .
      </p>
      <p>
        What if we could share all this information we gather over the years in an opensource
        community platform. We combine our knowledge and write them down in a <b>collaborative</b>{' '}
        <b>low-level</b> way. This way we create <b>pages</b> or even better:
      </p>
      <Logo />
      <h2>How to</h2>
      <p>
        Like we said: we are going to do this in a <b>collaborative way</b>. To help you can create,
        edit or even review cheatsheets. This entire platform is established without a normal{' '}
        <b>database</b> but entirely by creating static files. These files are written with{' '}
        <b>markdown</b> <code>(.md)</code>. A very low-level way of adding formatting into a plain
        text file.
      </p>
      <p>
        <a
          className={styles.learnmore}
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about markdown
        </a>
      </p>
      <p>
        The way to actually collaborate is by just creating, editing or reviewing cheatsheets in our{' '}
        <b>
          <a href={require('package.json').repository.url} target="_blank">
            Bitbucket repository
          </a>
        </b>
        . Just checkout the repository, create or edit a cheatsheet in the <code>/cheatsheets</code>{' '}
        folder and create a pull request so your changes can be peer reviewed by others. But that's
        not all! This application is COMPLETELY opensource! So we can even collaborate in making
        this entire platform even better! Just Checkout the code and fix bugs, refactor code or add
        new features!
      </p>
      <p>
        The only thing you need to do after creating your cheatsheets is spreading the word! Work
        together with the people of your team or help each other out by asking around what the needs
        are. Share the cheatsheets with others in need of information. We look forward to your
        input!
      </p>
      <h2>Happy cheating!</h2>
    </Layout>
  </>
);

export default HowTo;
