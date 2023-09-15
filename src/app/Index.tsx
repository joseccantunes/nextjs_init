import Link from "next/link";
import { buttonVariants } from "@/app/_components/ui/Button";
import { getAuthSession } from "@/server/auth";
import TestComponent from "@/app/TestComponent";

export default async function Index() {
  const session = await getAuthSession();
  return (
    <>
      {session === null ? (
        <Link href={`sign-in`} className={buttonVariants({ variant: "default", className: "z-10" })}>
          Sign in
        </Link>
      ) : (
        <Link href={`admin`} className={buttonVariants({ variant: "default", className: "z-10" })}>
          Go to ADMIN {session?.user?.name}
        </Link>
      )}
      <TestComponent/>
    </>
  );
}
