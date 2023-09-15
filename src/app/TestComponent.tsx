"use client";
import type { FC } from "react";
import t from "@/app/_i18n/translate";

const TestComponent: FC = () => {
  return <>{t("edit", { file: "ficheiro" })}</>;
};

export default TestComponent;
