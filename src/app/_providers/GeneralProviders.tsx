"use client";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";
import { Toaster } from "@ui/Toaster";
import TrpcProvider from "./TrpcProvider";
import { IntlProvider } from "react-intl";
import messages from "@/app/_i18n/messages";

interface ProvidersProps {
  children: ReactNode;
}

const GeneralProviders: FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const lang = navigator.language.split(/[-_]/)[0] ?? "en"; // language without region code

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <IntlProvider locale={navigator.language} messages={messages(lang)} defaultLocale="en-US">
          <TrpcProvider>
            {children}
            {/*<ReactQueryDevtools />*/}
            <Toaster />
          </TrpcProvider>
        </IntlProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default GeneralProviders;
