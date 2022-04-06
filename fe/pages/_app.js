import Head from 'next/head';
import '../styles/App.scss';
import Header from '../components/header/Header';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <Head>
          <title>IGeDeBe: Beyond</title>
          <meta name='description' content='Find your favorite video games...' />
          <link
            rel='icon'
            href='https://vignette.wikia.nocookie.net/leagueoflegends/images/9/93/Bee_Happy_Emote.png'
          />
          <link rel='stylesheet' href='https://unpkg.com/swiper@7/swiper-bundle.min.css' />
        </Head>
        <Header />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
