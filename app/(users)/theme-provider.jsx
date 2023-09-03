'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ThemeProvider = ({ children, className }) => {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle(theme);
  }, [theme]);

  return <div className={className}>{children}</div>;
};
