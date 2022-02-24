import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

// import tmdbApi, { category, movieType } from '../../api/tmdbApi';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import onionSleeping from '../../assets/onionSleeping.png';
const HeroSlide = ({ dataArray }) => {
  SwiperCore.use([Autoplay]);

  const [games, setGames] = useState([]);
  useEffect(() => {
    if (!dataArray) return;
    setGames(dataArray.slice(1, 10));
  }, [dataArray]);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const params = { page: 1 };
  //     try {
  //       const response = await tmdbApi.getMoviesList(movieType.popular, { params });
  //       setMovieItems(response.results.slice(1, 5));
  //     } catch {
  //       console.log('error');
  //     }
  //   };
  //   getMovies();
  // }, []);

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 5000 }}
      >
        {games.map((data, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <HeroSlideItem index={i} data={data} />}
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        {games.map((item, i) => (
          <TrailerModal key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

const HeroSlideItem = (props) => {
  // const controls = useAnimation();

  // const { ref, inView } = useInView({
  //   threshold: 0,
  // });
  // let history = useHistory();

  // const data = props.data;

  // useEffect(() => {
  //   if (inView || props.index == 0) return controls.start('show');
  // }, [controls, props]);

  // const background = apiConfig.originalImage(
  //   data.backdrop_path ? data.backdrop_path : data.poster_path
  // );

  const setModalActive = async (videos) => {
    // select the specific modal
    const modal = document.querySelector(`#modal_${props.data.id}`);
    if (videos && videos.length > 0) {
      const videSrc = 'https://www.youtube.com/embed/' + videos[0].video_id;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer';
    }
    modal.classList.toggle('active');
  };
  // staggerChildren with framer
  const container = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 100,
      transition: {
        staggerChildren: 0.8,
      },
    },
  };
  // const item = {
  //   hidden: { opacity: 0 },
  //   show: { opacity: 1 },
  // };
  return (
    <div
      className={`hero-slide__item`}
      style={{
        backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_screenshot_big/${
          props.data.screenshots ? props.data.screenshots[0].image_id : props.data.cover.image_id
        }.jpg)`,
      }}
      // ref={ref}
    >
      <div className='hero-slide__item__content container'>
        <div
          // variants={container}
          // initial='hidden'
          // animate={controls}
          className='hero-slide__item__content__info'
        >
          <h2
            //  variants={item}
            className='title'
          >
            {props.data.name ? props.data.name : 'Game title unavailable'}
          </h2>
          <div
            // variants={item}
            className='overview'
          >
            {props.data.summary ? props.data.summary : 'Game content unavailable.'}
          </div>
          <motion.div
            // variants={item}
            className='btns'
          >
            {/* <Button onClick={() => hisrory.push('/movie/' + data.id)}>Watch now</Button> */}
            <OutlineButton onClick={() => setModalActive(props.data.videos)}>
              Watch trailer
            </OutlineButton>
          </motion.div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.data.cover.image_id}.jpg`}
            width={264}
            height={374}
            alt={'poster'}
            blurDataURL={onionSleeping.src ? onionSleeping.src : onionSleeping}
            placeholder='blur'
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width='100%' height='500px' title='trailer'></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
