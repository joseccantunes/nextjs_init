import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      console.log(ctx);
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
/*
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.example.findMany();
  }),
*/
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
