import { rest } from "msw";
import {
  createTaskResolver,
  loginResolver,
  registerResolver,
  tasksResolver,
  updateTaskResolver,
  userResolver,
} from "./resolvers";

const BASE_URL = "http://localhost:3000/*";

export const handlers = [
  rest.post(BASE_URL + "/user/users/login", loginResolver),
  rest.post(BASE_URL + "/user/users", registerResolver),
  rest.get(BASE_URL + "/user/users", userResolver),
  rest.get(BASE_URL + "/task/tasks", tasksResolver),
  rest.post(BASE_URL + "/task/tasks", createTaskResolver),
  rest.put(BASE_URL + "/task/tasks/*", updateTaskResolver),
];
