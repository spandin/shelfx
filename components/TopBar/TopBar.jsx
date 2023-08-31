'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';

import { BsPersonFill, BsArrowLeftShort } from 'react-icons/bs';

const TopBar = () => {
  const router = useRouter();

  const { isAuth, email } = useAuth();

  return (
    <nav className="flex content-center justify-between py-4">
      <div className="flex flex-row items-center gap-1">
        <BsArrowLeftShort className="text-4xl" onClick={() => router.back()} />
      </div>

      <Link href="/account">
        <div
          className="bg-lightW-200 border-lightW-400 flex h-[48px] w-[48px] flex-row content-center 
          justify-center rounded-full border-[1px] border-solid dark:border-darkV-100 dark:bg-darkV-300"
        >
          <div className="flex flex-col content-center justify-center">
            {isAuth ? String(email).charAt(0).toUpperCase() : <BsPersonFill />}
          </div>
        </div>
      </Link>
    </nav>
  );
};

export { TopBar };
