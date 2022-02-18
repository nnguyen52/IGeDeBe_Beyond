import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { SwiperSlide, Swiper } from 'swiper/react';

import Button from '../button/Button';

// import tmdbApi, { category } from '../../api/tmdbApi';

import MovieCard from '../movie-card/MovieCard';
import { motion } from 'framer-motion';

const MovieList = (props) => {
  return (
    <motion.div className='movie-list'>
      {props.dataArray ? (
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
          {props.dataArray.map((data, i) => (
            <SwiperSlide key={i}>
              <MovieCard i={i} item={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h1>Loading</h1>
      )}
    </motion.div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
