import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import onionSleeping from '../../assets/onionSleeping.png';
import { useRouter } from 'next/router';

const HeroSlide = ({ dataArray }) => {
  SwiperCore.use([Autoplay]);
  const [games, setGames] = useState([]);
  const timeToChangeSlide = 5000;
  useEffect(() => {
    if (!dataArray) return;
    setGames(dataArray.slice(1, 10));
  }, [dataArray]);

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: timeToChangeSlide }}
      >
        {games.map((data, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem index={i} data={data} timeToChangeSlide={timeToChangeSlide} />
            )}
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
  const controls = useAnimation();
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView || props.index == 0) {
      controls.start('show');
      setTimeout(() => {
        controls.start('hide');
      }, props.timeToChangeSlide);
    }
  }, [controls, props]);

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
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.8,
        duration: 1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const item = {
    hidden: {
      opacity: 0,
      x: -9999,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  };
  const imgItem = {
    hidden: {
      opacity: 0,
      x: -9999,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <div
      className={`hero-slide__item`}
      style={{
        backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_screenshot_big/${
          props.data.screenshots ? props.data.screenshots[0].image_id : props.data.cover.image_id
        }.jpg)`,
      }}
      ref={ref}
    >
      <div className='hero-slide__item__content container'>
        <motion.div
          variants={container}
          initial='hidden'
          animate={controls}
          className='hero-slide__item__content__info'
        >
          <motion.h2 variants={item} className='title'>
            {props.data.name ? props.data.name : 'Game title unavailable'}
          </motion.h2>
          <motion.div variants={item} className='overview'>
            {props.data.summary ? props.data.summary : 'Game content unavailable.'}
          </motion.div>
          <motion.div variants={item} className='btns'>
            <OutlineButton onClick={() => setModalActive(props.data.videos)}>
              Watch trailer
            </OutlineButton>
            <OutlineButton onClick={() => router.push(`game/${props.data.id}`)}>
              Visit
            </OutlineButton>
          </motion.div>
        </motion.div>
        <motion.div
          variants={container}
          initial='hidden'
          animate={controls}
          className='hero-slide__item__content__poster'
        >
          <motion.div variants={imgItem}>
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.data.cover.image_id}.jpg`}
              width={264}
              height={374}
              alt={'poster'}
              blurDataURL={onionSleeping.src ? onionSleeping.src : onionSleeping}
              placeholder='blur'
            />
          </motion.div>
        </motion.div>
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
