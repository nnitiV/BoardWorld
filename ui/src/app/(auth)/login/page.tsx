"use client";

import CheckboxInput from "@/components/form/CheckboxInput";
import ErrorDiv from "@/components/form/ErrorDiv";
import SubmitButton from "@/components/form/SubmitButton";
import TextInput from "@/components/form/TextInput";
import { useLoginMutation } from "@/hooks/useAuthMutation";
import { useDeviceId } from "@/hooks/useDeviceId";
import { getErrorMessage } from "@/utils/validator";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { mutate: loginUser, isPending, isError, error } = useLoginMutation();
  
  const errorMessage = getErrorMessage(error);
  const deviceIdRef = useDeviceId();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deviceId = deviceIdRef.current;
    loginUser({ login, password, rememberMe, deviceId });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12">
      <div className="shadow-2xl w-full mx-auto p-4 py-8 border text-blue-950 border-black/20 rounded-2xl md:w-1/3 bg-white ">
        <h1 className=" text-2xl font-semibold text-center mb-8">Login</h1>
        <ErrorDiv isError={isError} errorMessage={errorMessage} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <TextInput
            type="text"
            id="login"
            placeholder="login"
            label="Login:"
            inputValue={login}
            onChange={(e) => setLogin(e.target.value)}
            className="flex flex-col mb-4 gap-2"
          />
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            label="Password:"
            inputValue={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex flex-col mb-4 gap-2"
          />
          <CheckboxInput
            label="Remember me"
            id="remember-me"
            checked={rememberMe}
            setChecked={setRememberMe}
            className="remember-me-container w-fit ps-1"
          />
          <SubmitButton isPending={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </SubmitButton>
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
