"use client";

import { signIn } from "next-auth/react";
import type {FC, HTMLAttributes} from "react";
import { toast } from "react-toastify";
import {cn} from "@/app/_lib/utils";
import {Button} from "@ui/Button";
import { Icons } from "@ui/Icons";
import {useState} from "react";

const UserAuthForm: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error("There was an error logging in with Google");
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button isLoading={isLoading} type="button" size="sm" className="w-full" onClick={loginWithGoogle} disabled={isLoading} variant="outline">
        {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
