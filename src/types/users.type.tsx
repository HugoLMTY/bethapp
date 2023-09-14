import { Object } from "./object.type";

// types
export interface User extends Object {
  name: string;
  email: string;
  role: string;
}

export interface UserListProps {
  users: User[];
}

export type UpdateUser = User;

export interface AddUserFormProps {
  onSubmit: (user: User) => void;
}