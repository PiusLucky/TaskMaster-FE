import { loginJson } from "./json";

export const loginResolver = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(loginJson));
};
