import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${env.PORT}`; // dev SSR should use localhost
};