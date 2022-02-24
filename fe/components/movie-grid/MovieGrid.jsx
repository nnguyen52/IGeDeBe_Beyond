import React from 'react';
import MovieCard from '../movie-card/MovieCard';
import { OutlineButton } from '../button/Button';
import Search from '../Search';

// if recoil state not available -> useStaticProps from nextjs
const MovieGrid = ({
  items,
  setItems,
  nextPaginationGames,
  isNextPaginationGamesAvailable,
  setPage,
  loadingNextPaginationGames,
}) => {
  const loadMore = async () => {
    setItems((prev) => prev.concat(nextPaginationGames));
    setPage((prev) => prev + 10);
  };

  return (
    <>
      <div className='mb-3'>
        <Search />
      </div>
      <div className='movie-grid'>
        {items.map((data, i) => (
          <MovieCard i={i} item={data} key={i} />
        ))}
      </div>
      {!loadingNextPaginationGames &&
      nextPaginationGames &&
      nextPaginationGames.length > 0 &&
      isNextPaginationGamesAvailable ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
