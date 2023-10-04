import {
  loginJson,
  registerJson,
  singleTaskJson,
  taskListJson,
  userJson,
} from "./json";

export const loginResolver = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(loginJson));
};

export const registerResolver = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(registerJson));
};

export const userResolver = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(userJson));
};

export const tasksResolver = (_req: any, res: any, ctx: any) => {
  
  return res(ctx.status(200), ctx.json(taskListJson));
};

export const createTaskResolver = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(singleTaskJson));
};

export const updateTaskResolver = (_req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(singleTaskJson));
};
