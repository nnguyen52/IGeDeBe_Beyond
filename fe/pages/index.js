import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import HeroSlide from '../components/hero-slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';
import MovieList from '../components/movie-list/MovieList';
import Link from 'next/link';
import ServerCrash from '../components/serverCrash';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { recoilState_justReleasedGames_Handler } from '../recoilStates/index';
import { useEffect } from 'react';
export default function Home({ justReleaseGames, comingSoonGames, mostAnticipatedGames, error }) {
  const setJustReleaseGames = useSetRecoilState(
    recoilState_justReleasedGames_Handler({ type: 'justReleaseGames' })
  );
  const setComingSoonGames = useSetRecoilState(
    recoilState_justReleasedGames_Handler({ type: 'comingSoon' })
  );
  const setMostAnticipatedGames = useSetRecoilState(
    recoilState_justReleasedGames_Handler({ type: 'mostAnticipated' })
  );
  // const data = useRecoilValue(recoilState_justReleasedGames_Handler('justReleaseGames'));
  useEffect(() => {
    if (!justReleaseGames) return;
    return setJustReleaseGames({ data: justReleaseGames, type: 'justReleaseGames' });
  }, [justReleaseGames]);
  useEffect(() => {
    if (!comingSoonGames) return;
    return setComingSoonGames({ data: comingSoonGames, type: 'comingSoon' });
  }, [comingSoonGames]);
  useEffect(() => {
    if (!mostAnticipatedGames) return;
    return setMostAnticipatedGames({ data: mostAnticipatedGames, type: 'mostAnticipated' });
  }, [mostAnticipatedGames]);

  if (error) return <ServerCrash />;
  return (
    <AnimatePresence exitBeforeEnter>
      {/* heroslide */}
      {/* <HeroSlide dataArray={justReleaseGames} /> */}
      {/* for news, coming soon, most anticipated games */}

      {/* News */}
      <motion.div className='section mb-3'>
        <div className='section__header mb-2'>
          <h2>New Games</h2>
          <Link href='/news'>
            <a>
              <OutlineButton className='small'>View more</OutlineButton>
            </a>
          </Link>
        </div>
        <MovieList dataArray={justReleaseGames} />
      </motion.div>
      {/* Coming Soon  */}
      <motion.div className='section mb-3'>
        <div className='section__header mb-2'>
          <h2>Coming Soon</h2>
          <Link href='/comingSoon'>
            <a>
              <OutlineButton className='small'>View more</OutlineButton>
            </a>
          </Link>
        </div>
        <MovieList dataArray={comingSoonGames} />
      </motion.div>
      {/* Most anticipated */}
      <motion.div className='section mb-3'>
        <div className='section__header mb-2'>
          <h2>Greatness</h2>
          <Link href='/mostAnticippated'>
            <a>
              <OutlineButton className='small'>View more</OutlineButton>
            </a>
          </Link>
        </div>
        <MovieList dataArray={mostAnticipatedGames} />
      </motion.div>
    </AnimatePresence>
  );
}
export async function getStaticProps() {
  try {
    const justReleasedGamesRes = await axios.post('http://localhost:3000/api/justReleasedGames');
    const comingSoonGamesRes = await axios.post('http://localhost:3000/api/comingSoonGames');
    const mostAnticipatedGamesRes = await axios.post(
      'http://localhost:3000/api/mostAnticipatedGames'
    );
    return {
      props: {
        justReleaseGames: justReleasedGamesRes.data.data || [],
        comingSoonGames: comingSoonGamesRes.data.filtered || [],
        mostAnticipatedGames: mostAnticipatedGamesRes.data.filtered || [],
      },
    };
  } catch (err) {
    return {
      props: {
        error: 'Server error',
      },
    };
  }
}
