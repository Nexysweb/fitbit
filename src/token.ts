import Koa from "koa";
import { TokenResponse } from "./fitbit/auth/type";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = (ctx: Koa.Context): string => {
  const token = ctx.cookies.get(ACCESS_TOKEN_KEY);

  if (!token) {
    //ctx.throw("could not find token", 400);
    throw Error("could not find token");
  }

  return token;
};

export const getRefreshToken = (ctx: Koa.Context): string => {
  const token = ctx.cookies.get(REFRESH_TOKEN_KEY);

  if (!token) {
    //ctx.throw("could not find token", 400);
    throw Error("could not find refresh token");
  }

  return token;
};

export const set = (
  response: Pick<TokenResponse, "access_token" | "refresh_token">,
  ctx: Koa.Context
) => {
  ctx.cookies.set(ACCESS_TOKEN_KEY, response.access_token);
  ctx.cookies.set(REFRESH_TOKEN_KEY, response.refresh_token);
};

export const deleteAccessToken = (ctx: Koa.Context) => {
  ctx.cookies.set(ACCESS_TOKEN_KEY, undefined);
};
