import React from 'react';
import beeSad from '../assets/beeSad.png';
import Image from 'next/image';
const Custom404 = () => {
  return (
    <div>
      <h3
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Image src={beeSad} placeholder='blur' width={250} height={250} />
        Sorry... I can not find what you were looking for.
      </h3>
    </div>
  );
};

export default Custom404;
