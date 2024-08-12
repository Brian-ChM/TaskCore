"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
  provider: "github" | "google";
}

export const SignInButton = ({ children, provider }: Props) => {
  async function handleClick() {
    await signIn(provider, { callbackUrl: "/" });
  }

  return (
    <Button onClick={handleClick} className="w-full" variant="outline">
      {children}
    </Button>
  );
};
