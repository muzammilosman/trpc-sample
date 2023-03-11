import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { User } from "./interfaces/user";
const t = initTRPC.create();

const userList: User[] = [
  {
    id: "1",
    name: "KATT",
  },
];

const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === "string") return val; // without using zod
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;
      const user = userList.find((u) => u.id === input);
      return user;
    }),
  userCreate: t.procedure
    .input(z.object({ name: z.string() })) // using zod
    .mutation((req) => {
      const id = `${Math.random()}`;

      const user: User = {
        id,
        name: req.input.name,
      };

      userList.push(user);

      return user;
    }),
});

export type AppRouter = typeof appRouter;
