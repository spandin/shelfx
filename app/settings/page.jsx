'use client';

import './_index.scss';

import { useLocalStorage } from '@/hooks/localstorage';

import { TopBar } from '@/components/TopBar/TopBar';
import { useEffect } from 'react';

// export const metadata = {
//   title: 'Настройки - ShelfX',
// };

export default function Settings() {
  // const [darkMode, setDarkMode] = useLocalStorage('darkMode');

  // useEffect(() => {
  //   if (
  //     localStorage.darkMode === 'light' ||
  //     (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  //   ) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  return (
    <div className="Settings w-full">
      <TopBar tittle={'Настройки'} />
      <div className="flex flex-col gap-5">
        <h3>Настройки</h3>
        <div className="flex flex-row items-center justify-between ">
          <p className="text-base">Тёмный режим:</p>
          <label className="switch ">
            <input type="checkbox" />
            <span
              className="slider round"
              // onClick={() =>
              //   darkMode !== 'dark'
              //     ? setDarkMode('dark', 'darkMode')
              //     : setDarkMode('light', 'darkMode')
              // }
            ></span>
          </label>
        </div>
        <p className="text-sm text-darkG-100">Зависит от темы вашего устройства</p>
      </div>
    </div>
  );
}
