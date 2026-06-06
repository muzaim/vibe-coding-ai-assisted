import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/health", () => ({ status: "OK", timestamp: new Date().toISOString() }))
  .group("/users", (app) =>
    app
      .get("/", async () => {
        try {
          return await db.select().from(users);
        } catch (error) {
          console.error("Error fetching users:", error);
          return { error: "Failed to fetch users" };
        }
      })
      .post(
        "/",
        async ({ body }) => {
          try {
            await db.insert(users).values({
              name: body.name,
              email: body.email,
            });
            return { success: true, message: "User created successfully" };
          } catch (error) {
            console.error("Error creating user:", error);
            return { error: "Failed to create user" };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
          }),
        }
      )
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
