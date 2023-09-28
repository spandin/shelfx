"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { useAuth } from "@/hooks/use-auth";

import { BsPersonFill } from "react-icons/bs";

import { realLenghtArr } from "@/lib/sort";

const TopBar = () => {
  const { isAuth, email } = useAuth();

  const posts = useSelector((state) => state.post.postsArray);

  return (
    <nav className="flex content-center justify-between py-4">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col justify-center text-[24px] font-semibold">
          Список
          <div className="flex flex-col justify-end text-sm font-medium">
            {realLenghtArr(posts)} позиции
          </div>
        </div>
      </div>

      <Link href="/account">
        <div
          className="flex h-[48px] w-[48px] flex-row content-center justify-center rounded-full 
        border-[1px] border-solid border-lightW-400 bg-lightW-200 dark:border-darkV-100 dark:bg-darkV-300"
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
