import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Artists } from "./collections/Artists";
import { Plantao } from "./collections/Plantao";
import { News } from "./collections/News";
import { Partners } from "./collections/Partners";
import { Shows } from "./collections/Shows";
import { Albums } from "./collections/Albums";
import { Incubadora } from "./globals/Incubadora";
import { Press } from "./globals/Press";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const isProd = process.env.NODE_ENV === "production";

export default buildConfig({
  serverURL,
  routes: {
    admin: "/cms",
    api: "/api/payload",
    graphQL: "/api/payload/graphql",
    graphQLPlayground: "/api/payload/graphql-playground",
  },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · 30praum CMS" },
  },
  collections: [Users, Artists, Plantao, News, Partners, Shows, Albums],
  globals: [Incubadora, Press],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    push: !isProd,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  csrf: [serverURL].filter(Boolean),
  cors: [serverURL].filter(Boolean),
  graphQL: {
    disablePlaygroundInProduction: true,
    disableIntrospectionInProduction: true,
    disable: isProd && process.env.PAYLOAD_ENABLE_GRAPHQL !== "1",
  },
});
