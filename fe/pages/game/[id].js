import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { recoilState_gameDetails_handler } from '../../recoilStates/index';
import axios from 'axios';
import Detail from '../../components/gameDetail/Detail';
import Loading from '../../components/Loading';
// import Loading from '../../assets';
const GameDetail = (props) => {
  const router = useRouter();
  const [gamesInRecoil, setGameDetailsRecoilState] = useRecoilState(
    recoilState_gameDetails_handler()
  );
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch new game
  useEffect(() => {
    setLoading(true);
    if (!router) return;
    if (!gamesInRecoil) return;
    if (gamesInRecoil.some((each) => each.id == router.query.id)) {
      const data = gamesInRecoil.find((each) => each.id == router.query.id);
      setGame(data);
      setLoading(false);
      return;
    }
    const fetchGame = async (id) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/getGamesDetails/${id}`);
        if (res.data.msg) throw Error(res.data.msg);
        return res.data;
      } catch (e) {
        setGame(null);
        router.push('/404');
        return;
      }
    };
    (async () => {
      const data = await fetchGame(router.query.id);
      setGame(data);
      setGameDetailsRecoilState(data);
      setLoading(false);

      return;
    })();
  }, [router, gamesInRecoil]);
  if (loading) return <Loading />;
  return <Detail data={game} />;
};

export default GameDetail;
