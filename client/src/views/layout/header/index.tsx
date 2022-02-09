import React, { FC, useState } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import Button from '../../../components/button';
import { saveItemToLS } from '../../../utils';
import logo from '../../../assets/app-logo.png';

import './header.scss';

const moonIcon = <HiOutlineMoon size={18} />;
const sunIcon = <HiOutlineSun size={18} />;
const iconAndText = {
  dark: { icon: moonIcon, text: 'Dark Mode' },
  light: { icon: sunIcon, text: 'Light Mode' },
};
const Header: FC = () => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const getIconAndText = () => {
    const themeName = !isActive ? 'dark' : 'light';
    return iconAndText[themeName];
  };
  const handleClick = () => {
    const themeName = !isActive ? 'dark' : 'light';
    saveItemToLS('data-theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    toggleClass();
  };

  const { icon, text } = getIconAndText();
  return (
    <header className="header">
      <div className="wrapper flex f-center-y f-btw">
        <div className="logo-container">
          <img src={logo} className="logo-img" alt="app-brand-logo" />
          <span className="logo-text">Spectrum data App</span>
        </div>
        <Button
          icon={icon}
          text={text}
          className={`header-btn ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
