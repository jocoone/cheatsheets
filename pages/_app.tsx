import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { Raleway } from '@next/font/google';
import Search from '../src/components/search';
import { select } from './search';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

const raleway = Raleway({
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  const [isMenuOpen, toggleMenu] = useState(false);

  const onScroll = (e: any) => {
    console.log(e);
  };

  return (
    <div className={raleway.className}>
      <div className="application-page">
        <header>
          Want to collaborate? <FontAwesomeIcon icon={faPeopleGroup} />
          <Link href={'/howto'}>Learn how</Link>
        </header>
        <aside>
          <nav>
            <Link className="home-link" href="/">
              <img src="/logo.svg" alt="logo" />
              <span className="badge">alpha</span>
            </Link>
            <div className="application-page__search">
              <Search select={select} placeholder="Search" onMenuToggle={toggleMenu} />
            </div>
          </nav>
          <footer>
            <img src="/axxes.svg" alt="Axxes logo" />
            <span className="copyright">© 2023 AXXES. ALL RIGHTS RESERVED.</span>
          </footer>
        </aside>
        <main>
          <div className={`page-wrapper ${isMenuOpen ? 'hide-overflow' : ''}`} onScroll={onScroll}>
            <Component {...pageProps} />
          </div>
          <div className={`overlay ${isMenuOpen ? 'opened' : ''}`}></div>
        </main>
      </div>
    </div>
  );
}
