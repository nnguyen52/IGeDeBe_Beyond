import React, { useEffect, useState } from 'react';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
import onionBro from '../../assets/onionSleeping.png';
import Gallery from './Gallery';
import WebsiteEnums from '../WebsiteEnum';
import { recoilState_gameDetails_handler } from '../../recoilStates/index';
import { useRecoilValue } from 'recoil';
const Detail = (props) => {
  const [game, setGame] = useState(null);
  useEffect(() => {
    if (!props.data) return;
    setGame(props.data);
  }, [props.data]);
  return (
    <>
      {game && (
        <>
          <div
            className='banner'
            style={{
              backgroundImage:
                game?.artworks || game?.screenshots || game?.cover
                  ? `url(https://images.igdb.com/igdb/image/upload/t_1080p/${
                      game?.artworks
                        ? game?.artworks[0].image_id
                        : game?.screenshots
                        ? game?.screenshots[0].image_id
                        : game?.cover.image_id
                    }.jpg)`
                  : `url('${onionBro.src}')`,
            }}
          ></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{
                  backgroundImage: game?.cover
                    ? `url(https://images.igdb.com/igdb/image/upload/t_1080p/${game?.cover?.image_id}.jpg)`
                    : `url('${onionBro.src}')`,
                }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <h1 className='title'>{game.name}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5em' }}>
                {game.genres &&
                  game.genres.map((genre, i) => (
                    <span key={i} className='genres__item'>
                      {genre.name}
                    </span>
                  ))}
                {game.themes &&
                  game.themes.map((theme, i) => (
                    <span key={i} className='genres__item'>
                      {theme.name}
                    </span>
                  ))}
              </div>
              <p className='overview'>{game?.summary}</p>
              {game?.websites && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    gap: '.5em',
                    justifyContent: 'end',
                  }}
                >
                  {game.websites.map((each, i) => {
                    return (
                      <span key={i} className='genres__item'>
                        <WebsiteEnums cate={each.category} url={each.url} />
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {game.similar_games && game.similar_games.length > 0 && (
            <div className='container'>
              {game.videos && (
                <div className='section mb-3'>
                  <h2>Trailer</h2>
                  {<VideoList videos={game.videos.slice(0, 1)} />}
                </div>
              )}
              {(props?.data?.artworks?.length > 0 || props?.data?.screenshots?.length > 0) && (
                <Gallery
                  data={
                    props?.data?.artworks && props?.data?.screenshots
                      ? props?.data?.screenshots.concat(props?.data?.artworks)
                      : props?.data?.screenshots
                      ? props?.data?.screenshots
                      : props?.data?.artworks
                  }
                />
              )}
              <div className='section mb-3'>
                <div className='section__header mb-2'>
                  <h2>Similar</h2>
                </div>
                <MovieList dataArray={game.similar_games} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
