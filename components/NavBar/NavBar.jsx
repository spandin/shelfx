'use client';

import './_index.scss';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  BsHouse,
  BsHouseFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsGear,
  BsGearFill,
} from 'react-icons/bs';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <ul className="nav flex justify-around bg-lightW-200 dark:bg-darkV-300 lg:flex lg:flex-col lg:justify-end lg:gap-10 lg:bg-lightW-400 lg:px-5 lg:py-10 lg:dark:bg-darkV-200">
      <li>
        <Link className={pathname == '/posts' ? 'active' : null} href={'/posts'}>
          {pathname == '/posts' ? <BsHouseFill /> : <BsHouse />}
        </Link>
      </li>
      <li>
        <Link className={pathname == '/add' ? 'active' : null} href={'/add'}>
          {pathname == '/add' ? <BsPlusCircleFill /> : <BsPlusCircle />}
        </Link>
      </li>
      <li>
        <Link className={pathname == '/settings' ? 'active' : null} href={'/settings'}>
          {pathname == '/settings' ? <BsGearFill /> : <BsGear />}
        </Link>
      </li>
    </ul>
  );
};

export { NavBar };
