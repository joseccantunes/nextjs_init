//import "@/styles/globals.css";
//import "react-toastify/dist/ReactToastify.css";

import { GeistSans } from "geist/font/sans";
import { type Viewport } from "next";
import { type ReactNode } from "react";

import { ThemeProvider } from "@/app/_providers/ThemeProvider";

export const metadata = {
  title: "BoxMenu",
  description: "O seu parceiro na hora de servir",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning lang="pt" className={`${GeistSans.variable}`}>
      <body className={`h-full bg-background font-sans text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {/*<Toaster />*/}
          {/*<AppTooltip />*/}
        </ThemeProvider>
      </body>
    </html>
  );
}
