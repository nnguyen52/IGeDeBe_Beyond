import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/happyBee.png';
import { useRouter } from 'next/router';
import CustomizeButton from '../customizeButton/CustomizeButton';
const headerNav = [
  {
    display: 'Search',
    path: '/search',
  },
  {
    display: 'News',
    path: '/news',
  },
  {
    display: 'Coming Soon',
    path: '/comingSoon',
  },
  {
    display: 'Greatness',
    path: '/greatness',
  },
];

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);
  useEffect(() => {
    if (!router) return;
  }, [router]);

  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className={`logo ${router.route == '/' ? 'linkDisabled' : null}`}>
          <Image
            src={logo}
            alt='Page logo'
            width={80}
            height={80}
            placeholder='blur' // Optional blur-up while loading
          />
          <Link href='/'>
            <a>
              IGeDeBe<sup style={{ fontSize: '1.4rem' }}>Beyond</sup>
            </a>
          </Link>
        </div>
        <ul className='header__nav'>
          {headerNav.map((e, i) => (
            // <li
            //   key={i}
            //   className={
            //     '/' + router.query.path == e.path || router.route == e.path ? 'linkDisabled' : null
            //   }
            // >
            //   <Link href={e.path}>
            //     <a>{e.display}</a>
            //   </Link>
            // </li>
            <li key={i}>
              <CustomizeButton
                active={`${
                  '/' + router.query.path == e.path || router.route == e.path ? true : false
                }`}
                content={e.display}
                routing={e.path}
                contentSize={'1rem'}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
