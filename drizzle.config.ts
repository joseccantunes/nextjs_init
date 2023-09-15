import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString:
        'mysql://bni3l5ve9i4apfizraf1:pscale_pw_Cafpu8bZT8L7okrk8saDAA9lepJwZDvwl7ox0lUyyJT@aws.connect.psdb.cloud/boxmenu-prod?ssl={"rejectUnauthorized":true}',
  },
  tablesFilter: ["boxmenu_*"],
} satisfies Config;
