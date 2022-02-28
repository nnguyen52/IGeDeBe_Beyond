import React from 'react';
import * as animationData from '../assets/loading.json';
import Lottie from 'react-lottie';
const Loading = (props) => {
  const defaultOptions = {
    loop: true,
    // autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRartio: 'xMidYMid slice',
    },
  };
  return (
    <div
      style={{
        width: `${props.width ? props.width : '100%'}`,
        height: `${props.height ? props.height : '100vh'}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={defaultOptions}
        height={props.contentHeight || 400}
        width={props.contentWidth || 400}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

export default Loading;
