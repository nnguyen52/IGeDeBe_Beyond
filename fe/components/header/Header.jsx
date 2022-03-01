import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/happyBee.png';
import { useRouter } from 'next/router';
import CustomizeButton from '../customizeButton/CustomizeButton';
import { useRecoilState } from 'recoil';
import { recoilState_window_props_handler } from '../../recoilStates/index';

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
  const [windowProps_recoil, setWindowProps_recoil] = useRecoilState(
    recoilState_window_props_handler()
  );

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowProps_recoil({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    try {
      return () => window.removeEventListener('resize', window);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
