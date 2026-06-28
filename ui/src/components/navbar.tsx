"use client";
import { useLogoutMutation } from "@/hooks/useAuthMutation";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isToggled, setIsToggled] = useState<boolean>(true);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { mutate: logout } = useLogoutMutation();
  const user = useUserStore(state => state.user);

  return (
    <>
      <header className="bg-blue-950 text-slate-100 shadow-md border-b border-slate-950 py-4 px-6">
        <div className="container mx-auto grid grid-cols-2 items-center">
          <h1 className="text-2xl font-bold cursor-pointer">Board World</h1>
          <ul className="hidden justify-around md:flex">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/allProducts"}>All Products</Link>
            </li>
            {user?.role == "ADMIN" && (
              <li>
                <Link href={"/admin"}>Admin</Link>
              </li>
            )}
            <li>
              <Link href={"#"}>About</Link>
            </li>
            <li>
              {accessToken ? (
                <Link href={"#"} onClick={() => logout()}>
                  Logout
                </Link>
              ) : (
                <Link href={"/login"}>Log in</Link>
              )}
            </li>
          </ul>
          <div
            className="w-fit ms-auto hover:pointer"
            onClick={() => setIsToggled((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              className="fill-current cursor-pointer text-slate-100 md:hidden"
            >
              <path d="M 3 8 A 2.0002 2.0002 0 1 0 3 12 L 47 12 A 2.0002 2.0002 0 1 0 47 8 L 3 8 z M 3 23 A 2.0002 2.0002 0 1 0 3 27 L 47 27 A 2.0002 2.0002 0 1 0 47 23 L 3 23 z M 3 38 A 2.0002 2.0002 0 1 0 3 42 L 47 42 A 2.0002 2.0002 0 1 0 47 38 L 3 38 z"></path>
            </svg>
          </div>
        </div>
      </header>
      <div
        className={clsx(
          "w-full h-full bg-black/50 fixed transition-opacity duration-300 md:hidden",
          !isToggled ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <div
          className={clsx(
            "h-full fixed top-0 right-0 bg-slate-950 text-slate-100 p-4 index-10 transition-transform duration-300",
            !isToggled ? "translate-x-full" : "translate-x-0",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 30 30"
            className="fill-current z-10 text-slate-100 fixed top-3 right-2 cursor-pointer"
            onClick={() => setIsToggled((prev) => !prev)}
          >
            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
          </svg>
          <ul className="mt-9 flex flex-col gap-5">
            <li>
              <Link href={"/"} onClick={() => setIsToggled((prev) => !prev)}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/allProducts"} onClick={() => setIsToggled((prev) => !prev)}>
                All Products
              </Link>
            </li>
            {user?.role == "ADMIN" && (
              <li>
                <Link href={"/admin"} onClick={() => setIsToggled((prev) => !prev)}>Admin</Link>
              </li>
            )}
            <li>
              <Link href={"#"} onClick={() => setIsToggled((prev) => !prev)}>
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                onClick={() => setIsToggled((prev) => !prev)}
              >
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
