'use client';

import { useEffect, useState } from 'react';

// useLocalStorage hook
const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};

export { useLocalStorage };
