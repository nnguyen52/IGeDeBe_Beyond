import React from 'react';
import Link from 'next/link';
import Button from '../button/Button';
import { motion } from 'framer-motion';
import onionBro from '../../assets/onionSleeping.png';

const MovieCard = (props) => {
  const item = props.item;

  const gameVariants = {
    hidden: { opacity: 0 },
    show: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.5,
      },
    }),
  };
  return (
    <motion.div custom={props.i} variants={gameVariants}>
      <Link href={`/game/${item.id}`}>
        <a>
          <div
            className='movie-card'
            style={{
              backgroundImage: item.cover
                ? `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg)`
                : `url('${onionBro.src}')`,
            }}
          >
            <Button>
              <span style={{ color: 'black' }}> Info </span>
            </Button>
          </div>
          <h3>{item.name}</h3>
        </a>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
