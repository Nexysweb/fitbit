import fetch from "node-fetch";

import * as C from "./config";
import * as T from "./type";

// doc https://dev.fitbit.com/build/reference/web-api/oauth2/#refreshing-tokens

const scope = C.scopes.join(" ");

export const getOauthUrl = () => {
  const params = {
    response_type: "code",
    client_id: C.clientId,
    redirect_uri: C.redirect_uri,
    scope,
  };

  return C.authUrl + "?" + paramsToString(params);
};

const paramsToString = (params: { [key: string]: any }) =>
  Object.entries(params)
    .map(([k, v]) => k + "=" + encodeURIComponent(v))
    .join("&");

const request = async <A>(
  url: string,
  params: { [key: string]: any }
): Promise<A> => {
  const preAuthorization = `${C.clientId}:${C.clientSecret}`;
  const authorization =
    "Basic " + Buffer.from(preAuthorization).toString("base64");
  const headers = {
    authorization,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = paramsToString(params);

  const r = await fetch(url, { headers, body, method: "POST" });

  return r.json();
};

export const getRefreshToken = async (
  refresh_token: string
): Promise<T.TokenResponse> => {
  const params = {
    grant_type: "refresh_token",
    refresh_token,
  };

  return request(C.refreshUrl, params);
};

export const getToken = async (code: string): Promise<T.TokenResponse> => {
  const params = {
    client_id: C.clientId,
    grant_type: "authorization_code",
    redirect_uri: C.redirect_uri,
    code,
  };

  return request(C.refreshUrl, params);
};

export const revoke = (token: string) => {
  const url = "https://api.fitbit.com/oauth2/revoke";
  const params = { token };

  return request(url, params);
};
