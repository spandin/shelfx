"use client";

import "./_index.scss";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  BsHouse,
  BsHouseFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsGear,
  BsGearFill,
} from "react-icons/bs";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <ul className="nav">
      <li>
        <Link
          className={pathname == "/posts" ? "active" : null}
          href={"/posts"}
        >
          {pathname == "/posts" ? <BsHouseFill /> : <BsHouse />}
        </Link>
      </li>
      <li>
        <Link className={pathname == "/add" ? "active" : null} href={"/add"}>
          {pathname == "/add" ? <BsPlusCircleFill /> : <BsPlusCircle />}
        </Link>
      </li>
      <li>
        <Link className={pathname == "/settings" ? "active" : null} href={"/"}>
          {pathname == "/settings" ? <BsGearFill /> : <BsGear />}
        </Link>
      </li>
    </ul>
  );
};

export { NavBar };
