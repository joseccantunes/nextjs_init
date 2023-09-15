"use client";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      toastClassName="text-sm dark:bg-gray-900 bg-gray-50 dark:text-white text-gray-900"
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
