"use client";
import DateInput from "@/components/form/DateInput";
import ErrorDiv from "@/components/form/ErrorDiv";
import SubmitButton from "@/components/form/SubmitButton";
import TextInput from "@/components/form/TextInput";
import { useRegisterMutation } from "@/hooks/useAuthMutation";
import { RegisterCredentials } from "@/types/auth.type";
import { getErrorMessage, isStrongPassword, isValidEmail } from "@/utils/validator";
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
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalError, setIsLocalError] = useState<boolean>(false);
  const { mutate: register, isPending, isError, error } = useRegisterMutation();
  const errorMessage = getErrorMessage(error);

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
    setIsLocalError(false);
    setLocalError(null);
    if (
      !registerUser.email ||
      !registerUser.username ||
      !registerUser.name ||
      !registerUser.password ||
      !registerUser.dateOfBirth ||
      !confirmPassword
    ) {
      setIsLocalError(true);
      setLocalError("Please, provide value for all fields.");
      return;
    }
    if (!isValidEmail(registerUser.email)) {
      setIsLocalError(true);
      setLocalError("Please, provide a valid email.");
      return;
    }
    if (!isStrongPassword(registerUser.password)) {
      setIsLocalError(true);
      setLocalError(
        "Please, provide a strong password (Bigger than 8 characters, lowercase, uppercase and a number).",
      );
      return;
    }
    if (registerUser.password !== confirmPassword) {
      setIsLocalError(true);
      setLocalError("Passwords do not match. Please try again.");
      return;
    }
    register(registerUser);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12">
      <div className="shadow-2xl w-full max-w-2xl mx-auto p-4 py-8 border bg-white text-blue-950 border-black/10 rounded-2xl">
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Register
        </h1>
        <ErrorDiv isError={isError || isLocalError} errorMessage={localError || errorMessage} />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <TextInput
            label="Email:"
            placeholder="Email"
            id="email"
            inputValue={registerUser.email}
            onChange={handleSettingsChange}
            type="email"
            className="flex flex-col mb-4 gap-2"
          />
          <TextInput
            label="Name:"
            placeholder="Name"
            id="name"
            inputValue={registerUser.name}
            onChange={handleSettingsChange}
            type="text"
            className="flex flex-col mb-4 gap-2"
          />
          <TextInput
            label="Username:"
            placeholder="Username"
            id="username"
            inputValue={registerUser.username}
            onChange={handleSettingsChange}
            type="text"
            className="flex flex-col mb-4 gap-2"
          />
          <DateInput
            label="Date of birth:"
            placeholder="dd/mm/yyyy"
            id="dateOfBirth"
            value={registerUser.dateOfBirth}
            onChange={handleSettingsChange}
            className="flex flex-col mb-4 gap-2"
          />
          <TextInput
            label="Password:"
            placeholder="Password"
            id="password"
            inputValue={registerUser.password}
            onChange={handleSettingsChange}
            type="password"
            className="flex flex-col mb-4 gap-2"
          />
          <TextInput
            label="Confirm Password:"
            placeholder="confirmPassword"
            id="confirmPassword"
            inputValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="flex flex-col mb-4 gap-2"
          />
          <SubmitButton
            isPending={isPending}
            className="col-span-2">
              {isPending ? "Regitering..." : "Register"}
            </SubmitButton>
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
