import './_index.scss';

import { TopBar } from '@/components/TopBar/TopBar';

export const metadata = {
  title: 'Настройки - ShelfX',
};

export default function ProductsPage() {
  return (
    <div className="Settings w-full">
      <TopBar tittle={'Настройки'} />
      <div className="flex flex-col gap-5">
        <h3>Настройки</h3>
        <div className="flex flex-row items-center justify-between">
          <p className="text-[14px]">Тёмный режим:</p>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
