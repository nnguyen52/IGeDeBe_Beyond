import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../movie-card/MovieCard';
import { motion } from 'framer-motion';
import Loading from '../Loading';

const MovieList = (props) => {
  const container = {
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };
  return (
    <motion.div className='movie-list' variants={container} initial='hidden' animate={'show'}>
      {props.dataArray ? (
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
          {props.dataArray.map((data, i) => (
            <SwiperSlide key={i}>
              <MovieCard i={i} item={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loading width={'100px'} height={'100px'} />
      )}
    </motion.div>
  );
};

MovieList.propTypes = {
  // category: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
};

export default MovieList;
