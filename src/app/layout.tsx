import type {ReactNode} from "react";
import GeneralProviders from "@/app/_providers/GeneralProviders";
import {Inter} from "next/font/google";
import {cn} from "@/app/_lib/utils";

type Props = {
    children: ReactNode;
};

const inter = Inter({subsets: ["latin"]});


import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";


export const metadata = {
    title: "BoxMenu",
    description: "O seu parceiro na hora de servir",
};


// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.3.0 where link clicks that switch
// the locale would otherwise be ignored.
export default function RootLayout({children}: Props) {
    return (
        <html className={cn("light", inter.className)}>
        <body>
        {/*<Link href="/admin" className={buttonVariants({ variant: "outline" })}>*/}
        {/*  ADMIN*/}
        {/*</Link>*/}
        {/*<NextIntlClientProvider locale={locale} messages={messages}>*/}
        <GeneralProviders>{children}</GeneralProviders>
        {/*</NextIntlClientProvider>*/}
        </body>
        </html>
    );
}
