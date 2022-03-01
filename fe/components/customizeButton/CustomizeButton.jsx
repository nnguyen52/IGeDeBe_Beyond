import React from 'react';
import Link from 'next/link';

const CustomizeButton = ({ content, routing, contentSize, active, mode }) => {
  return (
    <div className='custom_btn'>
      {routing ? (
        <Link href={routing ? routing : ''}>
          <a className={`${active == 'true' ? 'linkDisabled' : null}`}>
            <div className='border_plus'>
              <div className='custom_btn btn-3'>
                <span className='deco_top'></span>
                <b style={{ fontSize: contentSize, fontWeight: 'normal' }}> {content} </b>
                <span className='deco_bottom'></span>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <>
          <div className='border_plus'>
            <a className='custom_btn btn-3'>
              <span className='deco_top'></span>
              <b style={{ fontSize: contentSize, fontWeight: 'normal' }}> {content} </b>
              <span className='deco_bottom'></span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomizeButton;
