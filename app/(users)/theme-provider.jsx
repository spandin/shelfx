'use client';

import { useEffect } from 'react';

export const Html = ({ children, className, lang }) => {
  const theme = className;

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <html lang={lang} className={className}>
      {children}
    </html>
  );
};
