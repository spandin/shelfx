'use client';

import './_index.scss';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/slices/themeSlice';

import { TopBar } from '@/components/TopBar/TopBar';

// export const metadata = {
//   title: 'Настройки - ShelfX',
// };

export default function ProductsPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const toogleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.querySelector('.root').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="Settings w-full">
      <TopBar tittle={'Настройки'} />
      <div className="flex flex-col gap-5">
        <h3>Настройки</h3>
        <div className="flex flex-row items-center justify-between ">
          <p className="text-base">Тёмный режим:</p>
          <label className="switch ">
            <input type="checkbox" />
            <span className="slider round " onClick={toogleTheme}></span>
          </label>
        </div>
      </div>
    </div>
  );
}
