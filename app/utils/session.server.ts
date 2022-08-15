import {
  createCloudflareKVSessionStorage,
  createCookie,
} from "@remix-run/cloudflare";

let cookie = createCookie("vc_value", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 43_200,
  secrets: [SESSION_SECRET],
});

let { getSession, destroySession, commitSession } =
  createCloudflareKVSessionStorage({
    kv: SESSIONS,
    cookie,
  });

export { getSession, destroySession, commitSession };
