import fetch from "node-fetch";

const host = "https://api.fitbit.com";

const request = async (path: string, token: string) => {
  const url = host + path;
  const headers = {
    Authorization: "Bearer " + token,
  };

  const r = await fetch(url, { headers });

  return await r.json();
};

export const profile = async (token: string) =>
  request("/1/user/-/profile.json", token);

// sleep
export const getSleep = async (
  token: string,
  date: string,
  endDate?: string
) => {
  if (endDate) {
    const path = `/1.2/user/-/sleep/date/${date}/${endDate}.json`;

    return request(path, token);
  }

  const path = `/1.2/user/-/sleep/date/${date}.json`;
  return request(path, token);
};

export const getActivity = async (
  token: string,
  date: string,
  endDate?: string
) => {
  const userId = "-";
  const path = `/1/user/${userId}/activities/steps/date/${date}/${endDate}.json`;

  return request(path, token);
};

export const activityFrequent = async (token: string) => {
  const userId = "-";
  const path = `/1/user/${userId}/activities/frequent.json`;

  return request(path, token);
};

export const activities = async (token: string) =>
  request("/1/activities.json", token);
