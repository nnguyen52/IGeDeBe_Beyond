import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import HeroSlide from '../components/hero-slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';
import MovieList from '../components/movie-list/MovieList';
import Link from 'next/link';
import ServerCrash from '../components/ServerCrash';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
  recoilState_StartUpGames_Handler,
  recoilState_GamesPagination_Handler,
} from '../recoilStates/index';
import { useEffect } from 'react';
export default function Home({
  justReleaseGames,
  comingSoonGames,
  mostAnticipatedGames,
  justReleaseGamesPagination,
  comingSoonGamesPagination,
  mostAnticipatedGamesPagination,
  error,
}) {
  const setJustReleaseGames = useSetRecoilState(recoilState_StartUpGames_Handler());
  const setComingSoonGames = useSetRecoilState(recoilState_StartUpGames_Handler());
  const setMostAnticipatedGames = useSetRecoilState(recoilState_StartUpGames_Handler());
  // pagination
  const setJustReleaseGamesPagination = useSetRecoilState(recoilState_GamesPagination_Handler());
  const setComingSoonGamesPagination = useSetRecoilState(recoilState_GamesPagination_Handler());
  const setMostAnticipatedGamesPagination = useSetRecoilState(
    recoilState_GamesPagination_Handler()
  );
  const current_JustReleaseGamesPagination = useRecoilValue(
    recoilState_GamesPagination_Handler('justReleaseGames')
  );
  const current_ComingSoonGamesPagination = useRecoilValue(
    recoilState_GamesPagination_Handler('comingSoon')
  );
  const current_MostAnticipatedGamesPagination = useRecoilValue(
    recoilState_GamesPagination_Handler('mostAnticipated')
  );
  // set data from server to recoil state (for general)
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

  // for PAGINATION
  // set data from server to recoil state (for pagination)
  useEffect(() => {
    if (!justReleaseGamesPagination) return;
    if (
      current_JustReleaseGamesPagination !== undefined &&
      current_JustReleaseGamesPagination.length > 0
    )
      return;
    return setJustReleaseGamesPagination({
      data: justReleaseGamesPagination,
      type: 'justReleaseGames',
    });
  }, [justReleaseGamesPagination, current_JustReleaseGamesPagination]);
  useEffect(() => {
    if (!comingSoonGamesPagination) return;
    if (
      current_ComingSoonGamesPagination !== undefined &&
      current_ComingSoonGamesPagination.length > 0
    )
      return;
    return setComingSoonGamesPagination({ data: comingSoonGamesPagination, type: 'comingSoon' });
  }, [comingSoonGamesPagination, current_ComingSoonGamesPagination]);
  useEffect(() => {
    if (!mostAnticipatedGamesPagination) return;
    if (
      current_MostAnticipatedGamesPagination !== undefined &&
      current_MostAnticipatedGamesPagination.length > 0
    )
      return;
    setMostAnticipatedGamesPagination({
      data: mostAnticipatedGamesPagination,
      type: 'mostAnticipated',
    });
  }, [mostAnticipatedGamesPagination, current_MostAnticipatedGamesPagination]);

  if (error) return <ServerCrash />;
  return (
    <AnimatePresence exitBeforeEnter>
      {/* heroslide */}
      <HeroSlide dataArray={justReleaseGames} />
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
      {/* Coming Soon  */}

      <motion.div className='section mb-3'>
        <div className='section__header mb-2'>
          <h2>Greatness</h2>
          <Link href='/greatness'>
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
    const justReleasedGamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/justReleasedGames`
    );

    const comingSoonGamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/comingSoonGames`
    );
    const mostAnticipatedGamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/mostAnticipatedGames`
    );
    const justReleaseGamesPagination = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/getJustReleasedGamesPagination/0`
    );
    const comingSoonGamesPagination = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/getJustComingSoonGamesPagination/0`
    );
    const mostAnticipatedGamesPagination = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/getMostAnticipatedGamesPagination/0`
    );

    return {
      props: {
        justReleaseGames: justReleasedGamesRes.data.data || [],
        comingSoonGames: comingSoonGamesRes.data.filtered || [],
        mostAnticipatedGames: mostAnticipatedGamesRes.data.filtered || [],
        justReleaseGamesPagination: justReleaseGamesPagination.data || [],
        comingSoonGamesPagination: comingSoonGamesPagination.data || [],
        mostAnticipatedGamesPagination: mostAnticipatedGamesPagination.data || [],
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
