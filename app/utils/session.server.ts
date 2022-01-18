import { createCloudflareKVSessionStorage, createCookie } from "remix";

let cookie = createCookie("vc_value", {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 43_200,
  secrets: ["to-the-moon"],
});

let { getSession, destroySession, commitSession } =
  createCloudflareKVSessionStorage({
    kv: VALUE_CREATION,
    cookie,
  });

export { getSession, destroySession, commitSession };
