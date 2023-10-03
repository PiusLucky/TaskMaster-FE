import { rest } from "msw";
import { loginResolver } from "./resolvers";
import apiResources from "@/api/resources";

// Matches any "GET /user" requests,
// and responds using the `responseResolver` function.
export const handlers = [
  rest.get(apiResources.user + "/users/login", loginResolver),
];
