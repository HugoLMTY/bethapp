import * as elements from "typed-html";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { User, users } from "../db/schema";
import { AddUserForm, UserItem, UserList } from "../components/users/users";
import { error } from "../components/modals/errorModal";

export async function getUsersEndpoint() {
  const page = 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const data = await db.select().from(users).all();

  return (
    <div>
      <AddUserForm />
      <UserList users={data} />
    </div>
  );
}

// export async function createUserEndpoint({ body }: LocalHandler<TypedSchema<"users">, User>): Promise<string> {
export async function createUserEndpoint({ body }: any): Promise<string> {
  const { name, email, role } = body;
  const newUser = await db.insert(users).values({ name, email, role }).returning().get();
  return <UserItem {...newUser} />
}

export async function updateUserModal({ params }: any) {
  const { id: userId } = params;
  const res = await db.select().from(users).where(eq(users.id, parseInt(userId))).all();
  console.log({ userId, res })
  if (res.length === 0) return (error({ message: `User ${userId} not found` }));

  const { id, name, email, role } = res[0] as User;
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form 
          hx-post={"/users/" + id}
          hx-target={"#row_" + id}
          hx-swap="outerHTML"
          _="on submit target.reset()"
        >
          <div class="modal-header">
            <h5 class="modal-title">Edit { name } </h5>
          </div>
          <div class="modal-body">
              <div class="input-group flex flex-row space-x-3">
                <input required="true" class="form-control" type="text" placeholder="name" name="name" value={name} />
                <input required="true" class="form-control" type="text" placeholder="email" name="email" value={email} />
                <select class="form-select" name="role">
                  <option value="admin" selected={role === "admin" ? "true" : ""}>admin</option>
                  <option value="user" selected={role === "user" ? "true" : ""}>user</option>
                </select>
              </div>
          </div>
          <div class="modal-footer">
            <button class="btn" type="submit" data-bs-dismiss="modal">Update</button>
          </div>
        </form>        
      </div>
    </div>
  )
}

// export async function updateUserEndpoint ({ params, body }: { params: { id: number }, body: User }): Promise<string> {
export async function updateUserEndpoint ({ params, body }: any): Promise<string> {
  const { name, email, role } = body as User;
  const newUser = await db.update(users).set({ name, email, role }).where(eq(users.id, params.id)).returning().get();
  return <UserItem {...newUser} />
}

export async function deleteUserEndpoint ({ params }: any): Promise<void> {
  await db.delete(users).where(eq(users.id, params.id)).run();
}