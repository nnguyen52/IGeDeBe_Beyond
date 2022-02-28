import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Input from './input/Input';
import MovieCard from './movie-card/MovieCard';
import Loading from './Loading';
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
const Search = () => {
  const router = useRouter();
  const [searched, setSearched] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);
  const fetchGames = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/searchGames/${debouncedSearch}`
    );
    return res.data;
  };
  useEffect(() => {
    setIsLoading(false);
    setSearch('');
    setResults([]);
    setSearched(null);
  }, [router.query.path]);

  useEffect(() => {
    if (!debouncedSearch) setResults([]);
    if (isLoading) return;
    if (debouncedSearch) {
      setIsLoading(true);
      (async () => {
        const response = await fetchGames();
        setResults(response);
        setIsLoading(false);
        setSearched(true);
      })();
    }
  }, [debouncedSearch]);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px 1.5rem',
        }}
      >
        <Input
          type='text'
          placeholder='Search...'
          value={search}
          name='search'
          onChange={(e) => {
            if (searched) setSearched(false);
            setSearch(e.target.value);
          }}
          customStyle='colored_Border'
          width={`100%`}
        />
        {isLoading && (
          <Loading
            width={`250px`}
            height={`250px`}
            contentWidth={'150px'}
            contentHeight={'150px'}
          />
        )}
      </div>

      {!isLoading && results && results.length == 0 && searched && search !== '' && (
        <>
          <h2 style={{ color: 'crimson' }}>Sorry, {search} not found.</h2>{' '}
        </>
      )}
      {!isLoading && results && results.length > 0 && (
        <div className='movie-grid' style={{ marginTop: '2em' }}>
          {results.map((data, i) => {
            return <MovieCard i={i} item={data} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
