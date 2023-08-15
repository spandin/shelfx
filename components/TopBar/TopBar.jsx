"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

import { BsPersonFill, BsArrowLeftShort } from "react-icons/bs";

const TopBar = () => {
  const router = useRouter();

  const { isAuth, email } = useAuth();

  return (
    <nav className="flex justify-between content-center px-1 py-4">
      <div className="flex flex-row items-center gap-1">
        <BsArrowLeftShort className="text-4xl" onClick={() => router.back()} />
      </div>

      <Link href="/account">
        <div
          className="flex flex-row justify-center content-center w-[48px] h-[48px] rounded-full 
        bg-darkV-300 border-[1px] border-solid border-darkV-100"
        >
          <div className="flex flex-col justify-center content-center">
            {isAuth ? String(email).charAt(0).toUpperCase() : <BsPersonFill />}
          </div>
        </div>
      </Link>
    </nav>
  );
};

export { TopBar };
