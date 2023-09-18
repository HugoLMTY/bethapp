import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { BaseHtml } from "./components/base";
import { createUserEndpoint, deleteUserEndpoint, getUsersEndpoint, updateUserEndpoint, updateUserModal } from "./endpoints/users";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body>
        <h1>YNOV CRM CI DEPLOY 2.0</h1>
        <div class="flex w-full h-screen justify-center items-center"
          hx-get="/users"
          hx-swap="innerHTML"
          hx-trigger="load"
        />
        </body>
      </BaseHtml>
    )
  )
  .get("/users", getUsersEndpoint)
  .post('/users', createUserEndpoint)
  .get('/users/:id', updateUserModal)
  .post('/users/:id', updateUserEndpoint)
  .delete('/users/:id',deleteUserEndpoint)
  .get("/styles.css", () => Bun.file("./src/style.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);