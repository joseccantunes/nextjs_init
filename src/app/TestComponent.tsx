"use client";
import type { FC } from "react";
import t from "@/app/_i18n/translate";
import {trpc} from "@/app/_lib/trpc";

const TestComponent: FC = () => {
  const { data } = trpc.example.hello.useQuery({text: 'test'});
  if(!data) return (<div>loading...</div>);
  return <>{data.greeting}: {t("edit", { file: "ficheiro" })}</>;
};

export default TestComponent;
