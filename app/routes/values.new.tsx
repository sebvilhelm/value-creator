import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { createValue } from "~/models/values.server";
import { commitSession, getSession } from "~/utils/session.server";

export let action: ActionFunction = async ({ request }) => {
  let cookie = request.headers.get("Cookie");
  let session = await getSession(cookie);

  let name = session.get("name");

  if (typeof name !== "string") {
    return redirect("/set-name");
  }

  let [id, { date }] = await createValue(name);

  // 3. Set id in session
  session.set("value_id", id);
  session.set("value_created", date);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
