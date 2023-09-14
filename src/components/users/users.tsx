
import * as elements from "typed-html";
import { User } from "../../db/schema";

export function UserItem({ id, name, email, role }: User) {
  return (
    <tr id={"row_" + id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
      <button 
        hx-get={"/users/" + id} 
        hx-target="#update-modal" 
        hx-trigger="click"
        data-bs-toggle="modal"
        data-bs-target="#update-modal"
        class="btn btn-primary">Open Modal</button>

      <div id="update-modal"
          class="modal modal-blur fade"
          style="display: none"
          aria-hidden="false"
          tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div class="modal-content"></div>
          </div>
      </div>
        <button
          hx-delete={"/users/" + id}
          hx-trigger="click"
          hx-target={"#row_" + id}
          hx-confirm="T'es sûr?"
          class="btn btn-sm btn-secondary">
          Delete
        </button>
      </td>
    </tr>
  )
}

export function UserList({ users }: { users: User[] }) {
  return (
    <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
          users.map((user) => (
            <UserItem {...user} />
            ))
          }
          </tbody>          
        </table>
  );
}

export function AddUserForm() {
  return (
    <form
      class="input-group w-50 flex flex-row space-x-3"
      hx-post="/users"
      hx-swap="beforeend"
      hx-target="table tbody"
      _="on submit target.reset()"
    >
      <input required="true" class="form-control" type="text" placeholder="name" name="name" />
      <input required="true" class="form-control" type="text" placeholder="email" name="email" />
      <select class="form-select" name="role">
        <option value="admin">Admin</option>
        <option selected="true" value="user">User</option>
      </select>
      <button class="btn" type="submit">Add</button>
    </form>
  );
}
