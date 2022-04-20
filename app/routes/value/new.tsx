import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { commitSession, getSession } from "~/utils/session.server";

export let action: ActionFunction = async ({ request }) => {
  let cookie = request.headers.get("Cookie");
  let session = await getSession(cookie);

  let name = session.get("name");

  if (typeof name !== "string") {
    return redirect("/set-name");
  }
  // 1. Create a new value
  // 2. Set the KV
  // 3. Set id in session

  session.set("value_created", new Date());

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
