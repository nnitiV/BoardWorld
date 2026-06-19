"use client";

import { useLoginMutation } from "@/hooks/useAuthMutation";
import { useDeviceId } from "@/hooks/useDeviceId";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { mutate: loginUser, isPending, isError, error } = useLoginMutation();
  const errorMessage =
    error?.response?.data?.message || "An unexpected network error occurred.";
  const deviceIdRef = useDeviceId();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deviceId = deviceIdRef.current;
    loginUser({ login, password, rememberMe, deviceId });
  };
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12">
      <div className="shadow-2xl w-full mx-auto p-4 py-8 border text-blue-950 border-black/10 rounded-2xl md:w-1/3 ">
        <h1 className="mx-auto text-2xl font-semibold w-fit mb-8">Login</h1>
        {isError && (
          <div className="bg-red-50 border mb-6 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="login" className="ms-2 text-blue-950 font-bold">
              Login:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              placeholder="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="password" className="ms-2 text-blue-950 font-bold">
              password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="remember-me-container w-fit ps-1">
            <input
              type="checkbox"
              id="remember-me"
              name="_remember_me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="appearance-none w-3 h-3 border me-2 rounded-xl cursor-pointer transition-all checked:bg-black"
            />
            <label
              htmlFor="remember-me"
              className="text-blue-950 font-semibold cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-950 w-full block mx-auto text-slate-300 font-bold px-10 py-3 rounded-xl transition-all cursor-pointer hover:bg-blue-900 focus:ring-4 focus:ring-blue-100"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <hr className="my-8 border border-blue-950 rounded-2xl" />
        <div className="text-center text-sm text-slate-600 space-y-2">
          <p className="text-blue-950 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-800 font-bold">
              Create one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
