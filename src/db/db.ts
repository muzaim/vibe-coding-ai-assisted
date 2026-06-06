import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "mysql://root@localhost:3306/belajar_vibe_code";

const poolConnection = mysql.createPool({
  uri: connectionString,
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
