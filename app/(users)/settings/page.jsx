'use client';

import './_index.scss';

import { useSelector, useDispatch } from 'react-redux';

import { TopBar } from '@/components/TopBar/TopBar';
import { setTheme } from '@/store/theme/themeActions';
import { useEffect } from 'react';

// export const metadata = {
//   title: 'Настройки - ShelfX',
// };

export default function ProductsPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const toogleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));

  return (
    <div className="Settings w-full">
      <TopBar tittle={'Настройки'} />
      <div className="flex flex-col gap-5">
        <h3>Настройки</h3>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[14px]">Тёмный режим:</p>
          <label className="switch" onClick={toogleTheme}>
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
