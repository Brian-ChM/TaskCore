"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

export const LogOutButton = ({ children }: Props) => {
  async function handleClick() {
    await signOut();
  }

  return (
    <Button onClick={handleClick} className="w-full" variant="destructive">
      {children}
    </Button>
  );
};
