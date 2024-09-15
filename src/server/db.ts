import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

const createPrismaClient = () =>{
    return new PrismaClient({
        log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })/*.$extends({
        query: {
            $allModels: {
                async $allOperations({ model, operation, args, query }) {
                    if (model == "Product") {
                        if (operation === "findMany" || operation === "findFirst") {
                            args.where = { ...args.where, deleted: args.where?.deleted ?? false };
                        }
                    }

                    return query(args);
                },
            },
        },
    })*/;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
