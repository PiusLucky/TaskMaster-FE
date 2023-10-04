import { rest } from "msw";
import { loginResolver, registerResolver, tasksResolver, userResolver } from "./resolvers";

const BASE_URL = "http://localhost:3000/*";

export const handlers = [
  rest.post(BASE_URL + "/user/users/login", loginResolver),
  rest.post(BASE_URL + "/user/users", registerResolver),
  rest.get(BASE_URL + "/user/users", userResolver),
  rest.get(BASE_URL + "/task/tasks", tasksResolver),
];
