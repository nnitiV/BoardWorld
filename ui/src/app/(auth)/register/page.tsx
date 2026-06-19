"use client";
import { useRegisterMutation } from "@/hooks/useAuthMutation";
import { RegisterCredentials } from "@/types/auth.type";
import { isStrongPassword, isValidEmail } from "@/utils/validator";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Register() {
  const [registerUser, setRegisterUser] = useState<RegisterCredentials>({
    email: "",
    name: "",
    username: "",
    password: "",
    dateOfBirth: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { mutate: register, isPending, isError, error } = useRegisterMutation();
  const errorMessage =
    error?.response?.data?.message || "An unexpected network error occurred.";
  const handleSettingsChange = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const fieldName = event.target.name;
    const newValue = event.target.value;

    setRegisterUser((prevUser) => ({
      ...prevUser,
      [fieldName]: newValue,
    }));
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !registerUser.email ||
      !registerUser.username ||
      !registerUser.name ||
      !registerUser.password ||
      !registerUser.dateOfBirth ||
      !confirmPassword
    ) {
      setLocalError("Please, provide value for all fields.");
      return;
    }
    if(!isValidEmail(registerUser.email)){
        setLocalError("Please, provide a valid email.");
      return;
    }
    if(!isStrongPassword(registerUser.password)){
        setLocalError("Please, provide a strong password (Bigger than 8 characters, lowercase, uppercase and a number).");
      return;
    }
    if (registerUser.password !== confirmPassword) {
      setLocalError("Passwords do not match. Please try again.");
      return;
    }
    register(registerUser);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12">
      <div className="shadow-2xl w-full max-w-2xl mx-auto p-4 py-8 border text-blue-950 border-black/10 rounded-2xl">
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Register
        </h1>
        {(localError || isError) && (
          <div className="bg-red-50 border mb-6 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
            {localError || errorMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="email" className="ms-2 text-blue-950 font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={registerUser.email}
              onChange={handleSettingsChange}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="name" className="ms-2 text-blue-950 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={registerUser.name}
              onChange={handleSettingsChange}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="username" className="ms-2 text-blue-950 font-bold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={registerUser.username}
              onChange={handleSettingsChange}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label
              htmlFor="dateOfBirth"
              className="ms-2 text-blue-950 font-bold"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="dateOfBirth"
              value={registerUser.dateOfBirth}
              onChange={handleSettingsChange}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="password" className="ms-2 text-blue-950 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={registerUser.password}
              onChange={handleSettingsChange}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label
              htmlFor="confirmPassword"
              className="ms-2 text-blue-950 font-bold"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-transparent border-b-black/25 rounded-xl px-4 py-2 outline-0 transition-all focus:shadow-sm focus:border-blue-950"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="md:col-span-2 bg-blue-950 w-full block mx-auto text-slate-300 font-bold px-10 py-3 rounded-xl transition-all cursor-pointer hover:bg-blue-900 focus:ring-4 focus:ring-blue-100"
          >
            Register
          </button>
        </form>
        <hr className="my-8 border border-blue-950 rounded-2xl" />
        <div className="text-center text-sm text-slate-600 space-y-2">
          <p className="text-blue-950 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-800 font-bold">
              Sign in!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
