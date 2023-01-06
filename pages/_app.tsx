import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Raleway } from '@next/font/google';

const raleway = Raleway({
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={raleway.className}>
      <header className="application-header">
        <nav>
          <Link className="home-link" href="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <Link href="/howto" className={router.pathname === '/howto' ? 'active' : ''}>
            create a cheatsheet
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer>
        <img src="/axxes.svg" alt="Axxes logo" />
        <span className="copyright">© 2023 AXXES. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}
