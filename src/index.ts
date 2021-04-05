import Koa from "koa";
import Router from "koa-router";

import * as FitBitService from "./fitbit/";
import * as FitBitAuthService from "./fitbit/auth";
import * as TokenService from "./token";

const app = new Koa();
const router = new Router();

router.all("/", async (ctx) => {
  const { code } = ctx.query;

  if (code && typeof code === "string") {
    const r = await FitBitAuthService.getToken(code);
    console.log(r);
    TokenService.set(r, ctx);

    ctx.redirect("/");
    return;
  }

  ctx.body = `<div><p><a href=${FitBitAuthService.getOauthUrl()}>Connect</a></div>`;
});

router.get("/refresh", async (ctx) => {
  const refreshToken = TokenService.getRefreshToken(ctx);
  console.log(refreshToken);
  const r = await FitBitAuthService.getRefreshToken(refreshToken);
  console.log(r);
  TokenService.set(r, ctx);

  //ctx.redirect("/");
  ctx.body = r;
});

router.get("/revoke", async (ctx) => {
  const token = TokenService.getAccessToken(ctx);

  ctx.body = await FitBitAuthService.revoke(token);
  TokenService.deleteAccessToken(ctx);
});

router.get("/sleep", async (ctx) => {
  const token = TokenService.getAccessToken(ctx);
  const { date, endDate } = ctx.query;

  ctx.body = await FitBitService.getSleep(
    token,
    typeof date === "string" ? date : "2021-04-02",
    typeof endDate === "string" ? endDate : undefined
  );
});

router.get("/activity/frequent", async (ctx) => {
  const token = TokenService.getAccessToken(ctx);

  ctx.body = await FitBitService.activityFrequent(token);
});

router.get("/activity", async (ctx) => {
  const { date, endDate } = ctx.query;
  const token = TokenService.getAccessToken(ctx);

  ctx.body = await FitBitService.getActivity(
    token,
    typeof date === "string" ? date : "2021-04-02",
    typeof endDate === "string" ? endDate : undefined
  );
});

router.get("/activities", async (ctx) => {
  const token = TokenService.getAccessToken(ctx);

  ctx.body = await FitBitService.activities(token);
});

app.use(router.routes());

const port = 8080;
app.listen(port, () => console.log(`Server started at port ${port}`));
