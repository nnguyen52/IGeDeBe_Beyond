import React from 'react';
import beeSad from '../assets/beeSad.png';
import Image from 'next/image';

const ServerCrash = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <div>
        <div
          style={{
            height: 'auto',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Image src={beeSad} placeholder='blur' width={200} height={200} />
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>Sorry... The website encountered a conflict. </h1> <br />
        <h3 style={{ fontSize: '1.6rem' }}>
          Please let us know immediately via the{' '}
          <u>
            <a style={{ color: 'orange' }} href='mailto:coh.jr11@gmail.com'>
              creator's email
            </a>
          </u>{' '}
          !
        </h3>
        <br />
        <b style={{ fontSize: '1.5rem' }}>
          Please report the problem to the Owner as soon as you can! I am JerNgn, the Igedebe
          <sup>Beyond</sup>'s creator deeply sorry for the inconvenience. Please visit us later!
        </b>
        <h3 style={{ color: 'red' }}></h3>
      </div>
    </div>
  );
};

export default ServerCrash;
