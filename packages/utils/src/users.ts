import { apiFetch } from "./apiclient";
import { User } from "./types";

export async function getAllUsers() {
  return apiFetch<User[]>("/users");
}