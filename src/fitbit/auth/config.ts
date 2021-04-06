// my apps: https://dev.fitbit.com/apps
import Dotenv from "dotenv";

Dotenv.config();

export const clientId = process.env.FITBIT_CLIENT_ID || "";
export const clientSecret = process.env.FITBIT_CLIENT_SECRET || "";
export const redirect_uri = "https://127.0.0.1:8080/sso/redirect";
export const authUrl = "https://www.fitbit.com/oauth2/authorize";
export const refreshUrl = "https://api.fitbit.com/oauth2/token";

export const scopes = [
  "activity",
  "nutrition",
  "heartrate",
  "location",
  "nutrition",
  "profile",
  "settings",
  "sleep",
  "social",
  "weight",
];
