import React, { FC } from 'react';
import { ImHourGlass } from 'react-icons/im';
import './loading.scss';

interface LoadingProps {
  text?: string;
}

const loadingIcon = <ImHourGlass size={68} color="blue" />;
const Loading: FC<LoadingProps> = ({ text = '' }) => {
  return (
    <div className="loader">
      <span className="loading">{loadingIcon}</span>
      <p>Please Wait while loading {text}, this should take a second.</p>
    </div>
  );
};

export default Loading;
