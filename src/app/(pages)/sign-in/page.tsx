import UserAuthForm from "@/app/(pages)/sign-in/UserAuthForm";

import { Icons } from "@ui/Icons";
import Link from "next/link";
import LargeHeading from "@ui/LargeHeading";
import Paragraph from "@ui/Paragraph";
import { buttonVariants } from "@ui/Button";

export default function SignInPage() {
  return (
    <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link className={buttonVariants({ variant: "ghost", className: "w-fit" })} href="/">
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            back-to-home
          </Link>

          <LargeHeading>welcome!</LargeHeading>
          <Paragraph>sign-in-with</Paragraph>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
