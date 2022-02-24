import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { recoilState_gameDetails_handler } from '../../recoilStates/index';
import axios from 'axios';
import Detail from '../../components/gameDetail/Detail';

const GameDetail = (props) => {
  const router = useRouter();
  const [gamesInRecoil, setGameDetailsRecoilState] = useRecoilState(
    recoilState_gameDetails_handler()
  );
  const [game, setGame] = useState(null);

  // fetch new game
  useEffect(() => {
    if (!router) return;
    if (!gamesInRecoil) return;
    if (gamesInRecoil.some((each) => each.id.toString() == router.query.id.toString())) {
      const data = gamesInRecoil.find((each) => each.id == router.query.id.toString());
      setGame(data);
      return;
    }
    const fetchGame = async (id) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_APIURL_BACKEND}/api/getGamesDetails/${id}`
        );
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
      setGameDetailsRecoilState(gamesInRecoil.concat(data));
      return;
    })();
  }, [router, gamesInRecoil]);

  return <Detail data={game} />;
};

export default GameDetail;
