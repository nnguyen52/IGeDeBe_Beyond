import React, { useState, useEffect } from 'react';
import PageHeader from '../components/page-header/PageHeader';
import MovieGrid from '../components/movie-grid/MovieGrid';
import { useRouter } from 'next/router';
import axios from 'axios';
import ServerCrash from '../components/ServerCrash';
import { recoilState_GamesPagination_Handler } from '../recoilStates';
import { useRecoilValue, useSetRecoilState } from 'recoil';
const GamesBasedCategory = ({
  startup_backend_games,
  type,
  // startup_backend_justReleaseGamesPagination,
  // startup_backend_comingSoonGamesPagination,
  // startup_backend_mostAnticipatedGamesPagination,
  error,
}) => {
  const [serverError, setServerError] = useState(false);

  const router = useRouter();
  const setStartUp_justRelease_Pagination = useSetRecoilState(
    recoilState_GamesPagination_Handler()
  );
  const setStartUp_comingSoon_Pagination = useSetRecoilState(recoilState_GamesPagination_Handler());
  const setStartUp_mostAnticipated_Pagination = useSetRecoilState(
    recoilState_GamesPagination_Handler()
  );

  const startUp_justRelease_Pagination = useRecoilValue(
    recoilState_GamesPagination_Handler('justReleaseGames')
  );
  const startUp_comingSoon_Pagination = useRecoilValue(
    recoilState_GamesPagination_Handler('comingSoon')
  );
  const startUp_mostAnticipated_Pagination = useRecoilValue(
    recoilState_GamesPagination_Handler('mostAnticipated')
  );
  const [items, setItems] = useState([]);
  // pagination
  const [nextPaginationGames, setNextPaginationGames] = useState([]);
  const [isNextPaginationGamesAvailable, setIsNextPaginationGamesAvailable] = useState(false);
  const [loadingNextPaginationGames, setloadingNextPaginationGames] = useState(false);
  const [page, setPage] = useState(10);
  // pre-fetch next pagination
  useEffect(() => {
    if (!items) return;
    if (serverError || error) return;
    if (loadingNextPaginationGames) return;
    setNextPaginationGames([]);
    const getNextPaginationGames = async () => {
      try {
        setloadingNextPaginationGames(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/${
            type == 'news'
              ? 'getJustReleasedGamesPagination'
              : type == 'comingSoon'
              ? 'getJustComingSoonGamesPagination'
              : 'getMostAnticipatedGamesPagination'
          }/${page}`
        );
        setIsNextPaginationGamesAvailable(true);
        setNextPaginationGames(res.data);
        setloadingNextPaginationGames(false);
      } catch (e) {
        setPage(10);
        setIsNextPaginationGamesAvailable(false);
        setServerError(true);
        setloadingNextPaginationGames(false);
      }
    };
    getNextPaginationGames();
  }, [items, page]);
  // reset pagination when change category
  useEffect(() => {
    if (!type) return;
    setPage(10);
  }, [type]);
  //
  useEffect(() => {
    if (!router) return;
    if (router.query.path == 'news') {
      return setItems((prev) => startUp_justRelease_Pagination);
    }
    if (router.query.path == 'comingSoon') return setItems(startUp_comingSoon_Pagination);
    if (router.query.path == 'greatness') return setItems(startUp_mostAnticipated_Pagination);
  }, [
    router,
    startUp_comingSoon_Pagination,
    startUp_justRelease_Pagination,
    startUp_mostAnticipated_Pagination,
  ]);

  useEffect(() => {
    if (!startup_backend_games) return;
    if (!type) return;
    if (
      type == 'news' &&
      startup_backend_games !== undefined &&
      startup_backend_games.length > 0 &&
      (!startUp_justRelease_Pagination || startUp_justRelease_Pagination.length == 0)
    ) {
      return setStartUp_justRelease_Pagination({
        data: startup_backend_games,
        type: 'justReleaseGames',
      });
    }
    if (
      type == 'comingSoon' &&
      startup_backend_games !== undefined &&
      startup_backend_games.length > 0 &&
      (!startUp_comingSoon_Pagination || startUp_comingSoon_Pagination.length == 0)
    ) {
      return setStartUp_comingSoon_Pagination({
        data: startup_backend_games,
        type: 'comingSoon',
      });
    }
    if (
      type == 'greatness' &&
      startup_backend_games !== undefined &&
      startup_backend_games.length > 0 &&
      (!startUp_mostAnticipated_Pagination || startUp_mostAnticipated_Pagination.length == 0)
    )
      return setStartUp_mostAnticipated_Pagination({
        data: startup_backend_games,
        type: 'mostAnticipated',
      });
  }, [
    startup_backend_games,
    startUp_comingSoon_Pagination,
    startUp_justRelease_Pagination,
    startUp_mostAnticipated_Pagination,
  ]);
  if (error || (!loadingNextPaginationGames && serverError)) return <ServerCrash />;
  return (
    <div className='container'>
      {router && router.query.path && (
        <PageHeader>
          {router.query.path == 'news'
            ? 'New Games'
            : router.query.path == 'comingSoon'
            ? 'Coming Soon'
            : 'Greatness'}
        </PageHeader>
      )}
      <div className='section mb-3'>
        <MovieGrid
          type={type}
          startup_backend_games={startup_backend_games}
          // startup_backend_justReleasePagination={startup_backend_justReleaseGamesPagination}
          // startup_backend_comingSoonPagination={startup_backend_comingSoonGamesPagination}
          // startup_backend_mostAnticipatedPagination={startup_backend_mostAnticipatedGamesPagination}
          items={items}
          setItems={setItems}
          nextPaginationGames={nextPaginationGames}
          isNextPaginationGamesAvailable={isNextPaginationGamesAvailable}
          setPage={setPage}
          loadingNextPaginationGames={loadingNextPaginationGames}
        />
      </div>
    </div>
  );
};

export default GamesBasedCategory;

export async function getStaticProps({ params }) {
  try {
    const startup_backend_games = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/${
        params.path == 'news'
          ? `getJustReleasedGamesPagination`
          : params.path == `comingSoon`
          ? `getJustComingSoonGamesPagination`
          : params.path == `greatness`
          ? `getMostAnticipatedGamesPagination`
          : null
      }/0`
    );
    // const startup_backendr_justReleaseGamesPagination = await axios.post(
    //   '${process.env.REACT_APP_APIURL}/api/getJustReleasedGamesPagination/0'
    // );
    // const startup_backend_comingSoonGamesPagination = await axios.post(
    //   '${process.env.REACT_APP_APIURL}/api/getJustComingSoonGamesPagination/0'
    // );
    // const startup_backend_mostAnticipatedGamesPagination = await axios.post(
    //   '${apiURL}/api/getMostAnticipatedGamesPagination/0'
    // );
    return {
      props: {
        startup_backend_games: startup_backend_games.data || [],
        type: params.path,
        // startup_backend_justReleaseGamesPagination:
        //   startup_backend_justReleaseGamesPagination.data || [],
        // startup_backend_comingSoonGamesPagination:
        //   startup_backend_comingSoonGamesPagination.data || [],
        // startup_backend_mostAnticipatedGamesPagination:
        //   startup_backend_mostAnticipatedGamesPagination.data || [],
      },
    };
  } catch (err) {
    return { props: { error: 'Server error' } };
  }
}

export async function getStaticPaths() {
  const endPoints = ['news', 'comingSoon', 'greatness'];
  const paths = endPoints.map((each) => ({ params: { path: each.toString() } }));
  return {
    paths: paths,
    fallback: false,
  };
}
