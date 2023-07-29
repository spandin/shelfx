"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";

const TopBar = ({ tittle }) => {
  const { isAuth, email } = useAuth();

  return (
    <nav className="flex justify-between content-center px-1 py-4">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col justify-center text-[24px] font-semibold">
          {tittle}
        </div>
      </div>

      <Link href="/account">
        <div className="flex flex-row justify-center content-center w-[48px] h-[48px] rounded-full bg-darkV-300">
          <div className="flex flex-col justify-center content-center">
            {isAuth ? String(email).charAt(0).toUpperCase() : "Г"}
          </div>
        </div>
      </Link>
    </nav>
  );
};

export { TopBar };
