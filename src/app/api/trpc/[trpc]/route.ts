import { appRouter } from "@/server/api/root";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { ZodError } from "zod";
import { createTRPCContext } from "@/server/api/trpc";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext,
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts;
      console.log(error);
      if (error.cause instanceof ZodError) {
        // Returning only first zod error message to client
        //todo send error to a logging service
        ///console.log(error);
      }
    },
  });
};

export { handler as GET, handler as POST };
